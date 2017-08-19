import React, {Component} from 'react'
import styled from 'styled-components'

export default class Faq extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return <Div>Faq</Div>
  }
}

const Div = styled('div')`
  width: 100%;
  height:100%;
  display: flex;
  justify-content: center;
  `
