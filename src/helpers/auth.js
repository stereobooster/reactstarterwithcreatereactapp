import {firebaseAuth, firebaseRef} from 'config/constants'
import firebase from 'firebase'

export function signInWithEmailPassword(email, password) {
  return firebaseAuth.signInWithEmailAndPassword(email, password)
}

export function signUpWithEmailPassword(email, password) {
  return firebaseAuth.createUserWithEmailAndPassword(email, password)
}

// ////////////////////////////////////////////////
export function auth(provider) {
  return firebaseAuth.signInWithPopup(provider)
}

export function signInWithGoogle() {
  let provider = new firebase.auth.GoogleAuthProvider()
  // added scope to provider retrive user age range
  // provider.addScope('https://www.googleapis.com/auth/plus.login')
  return auth(provider)
}

export function signInWithFacebook() {
  let provider = new firebase.auth.FacebookAuthProvider()
  // added scope to provider retrive user age range
  // provider.addScope('https://www.googleapis.com/auth/plus.login')
  return auth(provider)
}

export function signInWithTwitter() {
  let provider = new firebase.auth.TwitterAuthProvider()
  // added scope to provider retrive user age range
  // provider.addScope('https://www.googleapis.com/auth/plus.login')
  return auth(provider)
}
// ///////////////////////////////////////////////

export function sendEmailVerification() {
  return firebaseAuth.currentUser.sendEmailVerification()
}

export function sendPasswordResetEmail(email) {
  return firebaseAuth.sendPasswordResetEmail(email)
}

export async function reloadUser() {
  // console.log('firebaseAuth.currentUser: ', firebaseAuth.currentUser)
  try {
    await firebaseAuth.currentUser.reload()
    await firebaseAuth.currentUser.getIdToken(true)
    // console.log('firebaseAuth.currentUser after reload: ', firebaseAuth.currentUser)
    const user = firebaseAuth.currentUser
    return user
  } catch (error) {
    return error
  }
}

export async function updateUser(user) {
  await firebaseRef.child(`users/${user.uid}`).update(user)
  return user
}

export function logOut() {
  // logs user out of firebase
  firebaseAuth.signOut()
  // stop listiing to all firebase nodes
  firebaseRef.off()
}
