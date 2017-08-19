import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as ActionCreators from 'redux/modules/authentication'
import Auth from 'components/Auth'
import * as reduxFormActionCreators from 'redux-form'
import {withRouter} from 'react-router-dom'

class AuthContainer extends Component {
  static propTypes = {
    handleAuthWithEmailPassword: PropTypes.func.isRequired,
    handlePasswordReset: PropTypes.func.isRequired,
    handleUnAuth: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
    authed: PropTypes.bool.isRequired,
    authError: PropTypes.string.isRequired,
    authType: PropTypes.string.isRequired,
    history: PropTypes.object,
    location: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {resetingPassword: false}
  }

  handleSubmitPress = async formData => {
    console.log('Auth Button Clicked: ')
    const {email, password} = formData
    const {authType} = this.props
    if (authType === 'PasswordReset') {
      const success = await this.props.handlePasswordReset(email)
      if (success) {
        //     Alert.alert(
        //   'Password Reset Email Sent',
        //   `Check your email: ${email} to reset password, and then log-in`,
        //       [
        //         { text: 'OK',
        //           onPress: () => {
        //             this.props.setAuthType('SignIn')
        //             this.props.resetLoginError()
        //             this.props.destroy('Auth')
        //           } },
        //       ],
        // )
      }
    } else if (authType === 'SignIn' || authType === 'SignUp') {
      const user = await this.props.handleAuthWithEmailPassword(
        email,
        password,
        this.props.authType
      )
      if (user) {
        // user exists in firebase do something now
        console.log('USER EXSITS IN FIREBAE NOW')
      }
    } else {
      // Alert.alert('submit Clicked')
    }
  }

  handlePasswordResetPress = () => {
    const {history} = this.props
    history.push('/passwordReset')
  }

  handleSignOutPress = () => {
    // console.log('Sign Out Button Clicked')
    this.props.handleUnAuth()
  }

  handleSignInWithGoogle = () => {
    this.props.handleAuthWithOauth('Google')
  }

  handleSignInWithFacebook = () => {
    this.props.handleAuthWithOauth('Facebook')
  }

  handleSignInWithTwitter = () => {
    this.props.handleAuthWithOauth('Twitter')
  }

  render() {
    return (
      <Auth
        handleSubmitPress={formData => this.handleSubmitPress(formData)}
        handleSignInWithGoogle={() => this.handleSignInWithGoogle()}
        handleSignInWithFacebook={() => this.handleSignInWithFacebook()}
        handleSignInWithTwitter={() => this.handleSignInWithTwitter()}
        handlePasswordResetPress={() => this.handlePasswordResetPress()}
        resetingPassword={this.state.resetingPassword}
        fetching={this.props.fetching}
        authed={this.props.authed}
        authError={this.props.authError}
        authType={this.props.authType}
        location={this.props.location}/>
    )
  }
}

function mapStateToProps({authentication, navigation}, props) {
  const {fetching, authed, authError, authType} = authentication
  const {location} = navigation
  return {
    fetching,
    authed,
    authError,
    authType,
    location,
  }
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators(
    {...ActionCreators, ...reduxFormActionCreators},
    dispatch
  )
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AuthContainer)
)
