import React, {Component} from 'react'
import PropTypes from 'prop-types'
import AuthContainer from 'containers/AuthContainer'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import * as ActionCreators from 'redux/modules/authentication'

class SignUpContainer extends Component {
  static propTypes = {
    setAuthType: PropTypes.func.isRequired,
    authType: PropTypes.string.isRequired,
  }
  static defaultProps = {}
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    this.props.setAuthType('SignUp')
    this.props.resetLoginError()
  }

  render() {
    return <AuthContainer />
  }
}

function mapStateToProps({authentication}, props) {
  const {authType} = authentication
  return {
    authType,
  }
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators({...ActionCreators}, dispatch)
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SignUpContainer)
)
