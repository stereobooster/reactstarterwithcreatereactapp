import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import * as ActionCreators from 'redux/modules/authentication'
import Nav from 'components/Nav'

class MainContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
  }
  static defaultProps = {}
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    const {authed, authedId} = this.props
    if (authed === true) {
      const {history} = this.props
      history.replace(`/user/${authedId}`)
    }
  }

  handleSignInPress = () => {
    const {history} = this.props
    history.push('/signIn/')
  }

  handleSignUpPress = () => {
    const {history} = this.props
    history.push('/signUp/')
  }

  handleSignOutPress = () => {
    console.log('Sign Out Button Clicked')
    this.props.handleUnAuth()
  }

  render() {
    return (
      <Div>
        <Nav
          authed={this.props.authed}
          handleSignOutPress={() => this.handleSignOutPress()}
          handleSignInPress={() => this.handleSignInPress()}
          handleSignUpPress={() => this.handleSignUpPress()}/>
        {this.props.children}
      </Div>
    )
  }
}

const Div = styled('div')`
  /*   min-width: 100%;
  min-height: 100%;
  margin: 0;
  padding: 0; */
  /* box-sizing: border-box; */
`

function mapStateToProps({authentication}, props) {
  const {fetching, authed, authError, authType, authedId} = authentication
  return {
    authed,
    authedId: authedId || null,
  }
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainContainer)
)
