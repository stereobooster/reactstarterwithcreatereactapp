import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Checkbox} from 'semantic-ui-react'

export default function PushNotification(props) {
  const pushLabel = props.pushSupported
    ? 'Push Notifications'
    : 'Push Notifications not supported'
  return (
    <Div>
      <Checkbox
        toggle={true}
        disabled={!props.pushSupported}
        label={pushLabel}
        onClick={(event, data) => props.handleToogle(event, data)}/>
    </Div>
  )
}

PushNotification.propTypes = {}.defaultProps = {}

const Div = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`
