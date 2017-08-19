import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as ActionCreators from 'redux/modules/authentication'
import VerifyEmail from 'components/VerifyEmail'
import {withRouter} from 'react-router-dom'
import {Button, Modal} from 'semantic-ui-react'

class VerifyEmailContainer extends Component {
  static propTypes = {
    handleSendingVerificationEmail: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    handleUserReload: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
  }
  static defaultProps = {}
  constructor(props) {
    super(props)
    this.state = {showModal: false}
  }

  handleResendingVerificationEmail = async () => {
    const emailStatus = await this.props.handleSendingVerificationEmail()
    // Modal(emailStatus)
  }

  handleContinuePress = async () => {
    // console.log('USER HIT Continue')
    const {history, authedId} = this.props
    const emailVerifiedStatus = await this.props.handleUserReload()
    if (!emailVerifiedStatus) {
      // Alert.alert('Email has not yet been Verified', 'Please check your email to verify, or resend email to verify.')
      this.setState({showModal: true})
    } else {
      // this.setState({showModal: false})
      history.replace(`/user/${authedId}`)
    }
  }

  handleModalClose() {
    this.setState({showModal: false})
  }

  render() {
    const {authed, emailVerified} = this.props
    return (
      <div>
        <Modal
          open={this.state.showModal}
          onClose={() => {
            this.handleModalClose()
          }}
          basic={true}
          size='small'>
          <Modal.Content>
            <p>
              Email has not yet been Verified, Please check your email to
              verify, or resend email to verify.
            </p>
            <Modal.Actions>
              <Button
                onClick={() => {
                  this.handleModalClose()
                }}
                basic={true}
                color='tomato'
                inverted={true}>
                {' '}Ok
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
        <VerifyEmail
          resendingVerificationEmail={() =>
            this.handleResendingVerificationEmail()}
          emailVerifiedContinue={() => this.handleContinuePress()}
          email={this.props.email}
          fetching={this.props.fetching}/>
      </div>
    )
  }
}

function mapStateToProps({authentication}, props) {
  const {authedUser, fetching, authed, authedId} = authentication
  return {
    email: authedUser ? authedUser.info.email : '',
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
  connect(mapStateToProps, mapDispatchToProps)(VerifyEmailContainer)
)
