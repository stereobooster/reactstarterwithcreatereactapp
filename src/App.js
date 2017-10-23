import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import {Helmet} from 'react-helmet'
import { AnimatedSwitch } from 'react-router-transition/lib/react-router-transition'
import HomeContainer from 'containers/HomeContainer'
import SecureHomeContainer from 'containers/SecureHomeContainer'
import SignInContainer from 'containers/SignInContainer'
import SignUpContainer from 'containers/SignUpContainer'
import PasswordResetContainer from 'containers/PasswordResetContainer'
import VerifyEmailContainer from 'containers/VerifyEmailContainer'
import MainContainer from 'containers/MainContainer'
import AboutUs from 'components/AboutUs'
import Faq from 'components/Faq'
import {firebaseAuth} from 'config/constants'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as ActionCreators from 'redux/modules/authentication'
import './App.css'
import buttonStyle from 'semantic/dist/components/buttonStyle.js'
import dividerStyle from 'semantic/dist/components/dividerStyle.js'
// import iconStyle from 'semantic/dist/components/iconStyle.js'
import formStyle from 'semantic/dist/components/formStyle.js'
import inputStyle from 'semantic/dist/components/inputStyle.js'
import modalStyle from 'semantic/dist/components/modalStyle.js'
import popupStyle from 'semantic/dist/components/popupStyle.js'

function PrivateRoute({component: Component, authed, emailVerified, ...rest}) {
  console.log('PrivateRoute function authed: ', authed)
  return (
    <Route
      {...rest}
      render={props =>
        authed === true
          ? <Component {...props} />
          : <Redirect to={{pathname: '/', state: {from: props.location}}} />}/>
  )
}

class App extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    firebaseAuth.onAuthStateChanged(user => {
      // console.warn('firebase user: ', user)
      console.log('User Already Loggedin:', user)
      this.props.onAuthChange(user)
    })
  }
  render() {
    const {authed, emailVerified, authedId, location, rehydrationComplete} = this.props
    console.log('Render function authed: ', authed)
    return (
       <MainContainer>
       <Helmet title= 'Home' style={[{type: 'text/css', cssText: buttonStyle},
       {type: 'text/css', cssText: dividerStyle},
       {type: 'text/css', cssText: formStyle},
       // {type: 'text/css', cssText: iconStyle},
       {type: 'text/css', cssText: inputStyle},
       {type: 'text/css', cssText: modalStyle},
       {type: 'text/css', cssText: popupStyle}]}/>
      <AnimatedSwitch
    atEnter={{ opacity: 0 }}
    atLeave={{ opacity: 0 }}
    atActive={{ opacity: 1 }}
    className='switch-wrapper'>
            <Route exact={true} path='/' component={HomeContainer} />
            <Route exact={true} path='/aboutUs' component={AboutUs} />
            <Route exact={true} path='/signIn' component={SignInContainer} />
            <Route exact={true} path='/SignUp' component={SignUpContainer} />
            <Route exact={true} path='/faq' component={Faq} />
            <Route exact={true} path='/passwordReset' component={PasswordResetContainer}/>
            <Route exact={true} path='/verifyEmail' component={VerifyEmailContainer}/>
            <PrivateRoute
              path='/user/:id'
              authed={authed}
              emailVerified={emailVerified}
              authedId={authedId}
              component={SecureHomeContainer}/>
            <Route render={() => <h2> Oops. Page not found. </h2>} />
          </AnimatedSwitch>
      </MainContainer>
    )
  }
}

function mapStateToProps({authentication}, props) {
  const {fetching, authed, authedId, authedUser, rehydrationComplete } = authentication
  const {location} = props
  return {
    fetching,
    authed,
    authedId: authedId || null,
    emailVerified: authedUser ? authedUser.info.emailVerified : false,
    location,
    rehydrationComplete,
  }
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators({...ActionCreators}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
