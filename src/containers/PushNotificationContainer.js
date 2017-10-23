import React, {Component} from 'react'
import PropTypes from 'prop-types'
import PushNotification from 'components/PushNotification'
import {
  requestMessegingPermission,
  getMessegingToken,
} from 'helpers/pushMessaging'
import {serviceWorkerCheck} from 'helpers/utils'

export default class PushNotificationContainer extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor(props) {
    super(props)
    this.state = {pushSupported: false}
  }

  componentDidMount() {
    this.handleDisablingPushSwitch()
  }

  handleDisablingPushSwitch() {
    const pushSupported = serviceWorkerCheck()
    console.log('PUSH ALLOWED AND SUPPORTED: ', this.state.pushSupported)
    if (pushSupported === '1') {
      this.setState({pushSupported: true})
    } else if (pushSupported === '1A') {
      this.setState({pushSupported: true})
    } else {
      this.setState({pushSupported: false})
    }
  }

  handleToogle = async (event, data) => {
    console.log(!data.checked)
    if (!data.checked) {
      const FCMToken = await requestMessegingPermission()
    }
  }

  render() {
    return (
      <div>
        <PushNotification
          pushSupported={this.state.pushSupported}
          handleToogle={(event, data) => this.handleToogle(event, data)}
        />
      </div>
    )
  }
}
