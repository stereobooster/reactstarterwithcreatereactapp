import React from 'react'
import PropTypes from 'prop-types'
import Loader from 'halogen/RiseLoader'
import styled from 'styled-components'

export default function Loading(props) {
  return (
    <StyledDiv>
      <Loader color='#424242' size='1em' margin='4px' />
    </StyledDiv>
  )
}

Loading.propTypes = {}.defaultProps = {}

const StyledDiv = styled('div')`
  display: flex;
  max-width: 100vw;
  height: 94vh;
  opacity: 0.35;
  justify-content: center;
  align-items: center;
`
