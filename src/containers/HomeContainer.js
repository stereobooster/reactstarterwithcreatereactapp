import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Home from 'components/Home'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class HomeContainer extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <Home />
  }
}

function mapStateToProps({authentication}, props) {
  const {fetching, authed, authError, authType, authedId} = authentication
  return {
    authed,
    authedId: authedId || null,
  }
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators({}, dispatch)
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
)
