import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Helmet} from 'react-helmet'

export default function SecureHome(props) {
  return (
    <Div>
      <Helmet title='Secure Home' />
      <div>Secure Home</div>
    </Div>
  )
}

SecureHome.propTypes = {}.defaultProps = {}

const Div = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`
