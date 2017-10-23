import React, {Component} from 'react'
import styled from 'styled-components'
import {Helmet} from 'react-helmet'

export default class Faq extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    window.history.replaceState({}, 'Title', '/faqs/')
  }

  render() {
    return (
      <Div>
      <Helmet title= 'Faq'/>
      Faq
      </Div>
    )
  }
}

const Div = styled('div')`
  width: 100%;
  height:100%;
  display: flex;
  justify-content: center;
  `
