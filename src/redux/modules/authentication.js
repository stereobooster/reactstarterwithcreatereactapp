import {
  updateUser,
  logOut,
  signInWithEmailPassword,
  signUpWithEmailPassword,
  signInWithGoogle,
  signInWithFacebook,
  signInWithTwitter,
  sendEmailVerification,
  sendPasswordResetEmail,
  reloadUser,
} from 'helpers/auth'
import {replace} from 'react-router-redux'
import {firebaseAuth} from 'config/constants'

const FETCHING = 'FETCHING'
const RESET_FETCHING = 'RESET_FETCHING'
const NOT_AUTHED = 'NOT_AUTHED'
const IS_AUTHED = 'IS_AUTHED'
const LOGIN_ERROR = 'LOGIN_ERROR'
const RESET_LOGIN_ERROR = 'RESET_LOGIN_ERROR'
const AUTH_TYPE = 'AUTH_TYPE'
export const LOGGING_OUT = 'LOGGING_OUT' // so listen to it in index.js to reset entire redux store to intial state all in one go instead of resseting it at each reducer

export function setFetching() {
  return {
    type: FETCHING,
  }
}

export function resetFetching() {
  return {
    type: RESET_FETCHING,
  }
}

function notAuthed() {
  return {
    type: NOT_AUTHED,
  }
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  }
}

export function resetLoginError() {
  return {
    type: RESET_LOGIN_ERROR,
  }
}

// triggers the state ='undefined' in the main index.js file
function loggingOut() {
  return {
    type: LOGGING_OUT,
  }
}

function setAuthed(uid, user) {
  return {
    type: IS_AUTHED,
    uid,
    user,
    lastUpdated: Date.now(),
  }
}

export function setAuthType(authType) {
  return {
    type: AUTH_TYPE,
    authType,
  }
}

export function handleAuthWithEmailPassword(email, password, type) {
  // console.warn('FETCHING FOR :', type)
  return async dispatch => {
    if (email && password !== '') {
      dispatch(setFetching())
      if (type === 'SignUp') {
        try {
          const user = await signUpWithEmailPassword(email, password)
          dispatch(resetLoginError())
          dispatch(handleSendingVerificationEmail())
          return user
          // console.warn('Signed Up User: ', user)
        } catch (error) {
          dispatch(notAuthed())
          switch (error.code) {
            case 'auth/email-already-in-use':
              dispatch(
                loginError(
                  'Account already exists with this email address. Please login Instead'
                )
              )
              break
            case 'auth/invalid-email':
              dispatch(
                loginError(
                  'Email is badly formated, Please check the email and try again.'
                )
              )
              break
            case 'auth/weak-password':
              dispatch(
                loginError(
                  'Password is weak, Please choose a stronger password and try again.'
                )
              )
              break
            case 'auth/operation-not-allowed':
              dispatch(
                loginError(
                  'Oops, We forgot to activate email/password Auth. Contact us to report this issue.'
                )
              )
              break
            default:
              dispatch(loginError('Oops, Error Occured. Please try Again'))
          }
          dispatch(resetFetching())
          // console.warn('Error in Signing up handleAuthWithEmailPassword: ', error2.message)
        }
      } else {
        try {
          const user = await signInWithEmailPassword(email, password)
          // console.warn('Logged In User: ', user)
          dispatch(resetLoginError())
          dispatch(handleSendingVerificationEmail())
          return user
        } catch (error) {
          dispatch(notAuthed())
          switch (error.code) {
            case 'auth/user-not-found':
              dispatch(
                loginError(
                  'There is no account corresponding to this email address.'
                )
              )
              break
            case 'auth/invalid-email':
              dispatch(
                loginError(
                  'Email is badly formated, Please check the email and try again.'
                )
              )
              break
            case 'auth/wrong-password':
              dispatch(
                loginError(
                  'Password is incorrect. Please enter a valid password for this email.'
                )
              )
              break
            case 'auth/user-disabled':
              dispatch(
                loginError(
                  'Our system has disabled your account for security reasons. Contact us to report this issue.'
                )
              )
              break
            default:
              dispatch(loginError('Oops, Error Occured. Please try Again'))
          }
          dispatch(resetFetching())
        }
      }
    } else {
      dispatch(notAuthed())
      dispatch(loginError('Both Fields are required!'))
      dispatch(resetFetching())
    }
  }
}

export function handleAuthWithOauth(provider) {
  return async dispatch => {
    dispatch(setFetching())
    try {
      let user = null
      switch (provider) {
        case 'Google':
          user = await signInWithGoogle()
          break
        case 'Facebook':
          user = await signInWithFacebook()
          break
        case 'Twitter':
          user = await signInWithTwitter()
          break
        default:
          dispatch(loginError('Oops, Error Occured. Please try Again'))
      }
      dispatch(resetLoginError())
      return user
    } catch (error) {
      dispatch(notAuthed())
      const email = error.email || ''
      console.log('SigninWithOauth Error: ', error)
      switch (error.code) {
        case 'auth/account-exists-with-different-credential':
          const providers = await firebaseAuth.fetchProvidersForEmail(email)
          dispatch(
            loginError(
              `A account already exists with this ${email}, Sign-In Using: ${providers[0]}`
            )
          )
          break
        case 'auth/cancelled-popup-request':
          dispatch(
            loginError(
              'Only one popup request allowed at a time. Please close the other popups, and try again.'
            )
          )
          break
        case 'auth/operation-not-allowed':
          dispatch(
            loginError(
              'Auth Provider type corresponding to the credential is not Enabled.'
            )
          )
          break
        case 'auth/operation-not-supported-in-this-environment':
          dispatch(
            loginError(
              'Auth Action not allowed on non Http or Https protocols.'
            )
          )
          break
        case 'auth/popup-blocked':
          dispatch(loginError('Auth Popup was blocked by the browser.'))
        case 'auth/popup-closed-by-user':
          dispatch(
            loginError(
              'The Auth Popup was closed without completing the Process.'
            )
          )
          break
        case 'auth/unauthorized-domain':
          dispatch(loginError('The domain is not authorized for OAuth Yet.'))
          break
        default:
          dispatch(loginError('Oops, Error Occured. Please try Again'))
      }
      dispatch(resetFetching())
    }
  }
}

export function onAuthChange(user) {
  return dispatch => {
    if (!user) {
      dispatch(notAuthed())
    } else {
      // user exists
      // update user in firebase database
      const {
        uid,
        displayName,
        photoURL,
        email,
        emailVerified,
        phoneNumber,
        isAnonymous,
        providerData,
      } = user
      const provider = providerData[0].providerId
      dispatch(setAuthed(uid, user))
      // only require email verification with password method
      if (emailVerified === false && provider === 'password') {
        dispatch(replace('/verifyEmail'))
      } else {
        dispatch(replace(`/user/${uid}`))
      }
      updateUser({
        uid,
        displayName,
        photoURL,
        email,
        emailVerified,
        phoneNumber,
        isAnonymous,
      }).then(() => {})
    }
  }
}

export function handlePasswordReset(email) {
  return dispatch => {
    dispatch(notAuthed())
    // logOut()
    dispatch(setFetching())
    return sendPasswordResetEmail(email)
      .then(() => {
        dispatch(resetLoginError())
        dispatch(resetFetching())
        console.log('Password reset email sent')
        return true
      })
      .catch(error => {
        console.log('Unable send password reset email', error)
        dispatch(resetFetching())
        switch (error.code) {
          case 'auth/user-not-found':
            dispatch(
              loginError(
                'There is not an account corresponding to this email address.'
              )
            )
            break
          case 'auth/invalid-email':
            dispatch(
              loginError(
                'Email is badly formated, Please check the email and try again.'
              )
            )
            break
          default:
            dispatch(loginError('Oops, Error Occured. Please try Again'))
        }
        return false
      })
  }
}

export function handleSendingVerificationEmail() {
  return (dispatch, getState) => {
    const emailVerified = getState().authentication.authedUser.info
      .emailVerified
    console.log('EmailVerified: ', emailVerified)
    if (!emailVerified) {
      return sendEmailVerification()
        .then(() => {
          // Email Sent succesfully
          console.log('Verfication Email Sent')
          return 'Verification Email Sent.'
        })
        .catch(error => {
          // Email not sent succesfully
          console.log('Unable send veification email:', error)
          return 'Error occured sending the Verification Email, Please try again.'
        })
    }
    return 'Email is already Verified.'
  }
}

export function handleUserReload() {
  return async dispatch => {
    try {
      const user = await reloadUser()
      // User succesfully reloaded
      console.log('User Sucecsfully reloaded: ', user)
      const {uid, displayName, photoURL, emailVerified} = user
      dispatch(setAuthed(uid, user))
      await updateUser({uid, displayName, photoURL, emailVerified})
      console.log('User Data Sucecsfully uploaded to firebase  after reload')
      return emailVerified
    } catch (error) {
      console.log('User reload Error Occured: ', error)
      return false
    }
  }
}

export function handleUnAuth() {
  return async dispatch => {
    logOut()
    dispatch(notAuthed())
  }
}

export function handleLogOut() {
  return dispatch => {
    logOut()
  }
}

const initialState = {
  authed: false,
  fetching: false,
  authedId: '',
  authError: '',
  authType: '',
  authedUser: initialUserState,
}

const initialUserState = {
  lastUpdated: 0,
  info: {
    displayName: '',
    email: '',
    uid: '',
    photoURL: '',
    emailVerified: false,
    isAnonymous: false,
    phoneNumber: '',
  },
}

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case FETCHING:
      return {
        ...state,
        fetching: true,
      }
    case RESET_FETCHING:
      return {
        ...state,
        fetching: false,
      }
    case NOT_AUTHED:
      return {
        ...state,
        fetching: false,
        authed: false,
        authedId: '',
        authedUser: initialUserState,
      }
    case IS_AUTHED:
      return {
        ...state,
        authed: true,
        fetching: false,
        authError: '',
        authedId: action.uid,
        authedUser: {lastUpdated: action.lastUpdated, info: action.user},
      }
    case LOGIN_ERROR:
      return {
        ...state,
        authed: false,
        fetching: false,
        authedId: '',
        password: '',
        authError: action.error,
      }
    case RESET_LOGIN_ERROR:
      return {
        ...state,
        authError: '',
      }
    case AUTH_TYPE:
      return {
        ...state,
        authType: action.authType,
      }
    default:
      return state
  }
}
