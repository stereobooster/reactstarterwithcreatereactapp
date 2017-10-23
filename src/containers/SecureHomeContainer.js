import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as ActionCreators from 'redux/modules/authentication'
import {withRouter} from 'react-router-dom'
import SecureHome from 'components/SecureHome'
import PushNotificationContainer from 'containers/PushNotificationContainer'

class SecureHomeContainer extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <SecureHome
          handleSignOutPress={() => {
            this.handleSignOutPress()
          }}/>
        <PushNotificationContainer />
      </div>
    )
  }
}

function mapStateToProps({authentication}, props) {
  const {fetching, authed, authedId, authedUser} = authentication
  return {
    fetching,
    authed,
    authedId: authedId || null,
    emailVerified: authedUser ? authedUser.info.emailVerified : false,
  }
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SecureHomeContainer)
)
