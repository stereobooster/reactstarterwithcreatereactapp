import React from 'react'
import PropTypes from 'prop-types'
import {Button} from 'semantic-ui-react'
import styled from 'styled-components'

export default function VerifyEmail(props) {
  const {email} = props
  return (
    <Div>
      <p>
        {`We sent an email to ${email}. Please follow the instructions in the email and verify to recieve full access to the app.`}
        Once Done Verifying Hit Continue.
      </p>
      <div>
        <Button
          style={{width: 320, maxWidth: '80%'}}
          iconRight={true}
          success={true}
          large={true}
          onClick={() => props.emailVerifiedContinue()}>
          Continue
        </Button>
      </div>
      Didn't get the email or faced an error of an Invalid Token?
      <div>
        <Button onClick={() => props.resendingVerificationEmail()}>
          Resend Email to Verify
        </Button>
      </div>
    </Div>
  )
}

const Div = styled('div')`
  width: 100%;
  height:100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  `

VerifyEmail.propTypes = {}
VerifyEmail.defaultProps = {}
