import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import {Helmet} from 'react-helmet'
import {RouteTransition} from 'react-router-transition'
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

function PrivateRoute({component: Component, authed, emailVerified, ...rest}) {
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
    const {authed, emailVerified, authedId, location} = this.props
    return (
      <MainContainer>
       <Helmet title= 'Home'/>
        <RouteTransition
          pathname={this.props.location.pathname}
          atEnter={{opacity: 0}}
          atLeave={{opacity: 2}}
          atActive={{opacity: 1}}
          mapStyles={styles => {
            if (styles.opacity > 1) {
              return {display: 'none'}
            }
            return {opacity: styles.opacity}
          }}>
          <Switch key={location.key} location={location}>
            <Route exact={true} path='/' component={HomeContainer} />
            <Route exact={true} path='/aboutUs' component={AboutUs} />
            <Route exact={true} path='/signIn' component={SignInContainer} />
            <Route exact={true} path='/SignUp' component={SignUpContainer} />
            <Route
              exact={true}
              path='/passwordReset'
              component={PasswordResetContainer}/>
            <Route
              exact={true}
              path='/verifyEmail'
              component={VerifyEmailContainer}/>
            <PrivateRoute
              path='/user/:id'
              authed={authed}
              emailVerified={emailVerified}
              authedId={authedId}
              component={SecureHomeContainer}/>
            <Route exact={true} path='/faq' component={Faq} />
            <Route render={() => <h2> Oops. Page not found. </h2>} />
          </Switch>
        </RouteTransition>
      </MainContainer>
    )
  }
}

function mapStateToProps({authentication}, props) {
  const {fetching, authed, authedId, authedUser} = authentication
  const {location} = props
  return {
    fetching,
    authed,
    authedId: authedId || null,
    emailVerified: authedUser ? authedUser.info.emailVerified : false,
    location,
  }
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators({...ActionCreators}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
