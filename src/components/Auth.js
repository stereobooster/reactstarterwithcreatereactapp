import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Field, reduxForm, formValues} from 'redux-form'
import Loading from 'components/Loading'
import ReduxFormTextInput from 'components/ReduxFormTextInput'
import {Form, Icon, Button, Divider} from 'semantic-ui-react'
import styled from 'styled-components'
import {Helmet} from 'react-helmet'
const Values = formValues('email', 'password')(Auth) // passes form fields values as props to Form component

function Auth(props) {
  const {
    handleSubmit,
    previousPage,
    pristine,
    reset,
    submitting,
    dirty,
    invalid,
    email,
    password,
    authError,
  } = props
  const onSubmit = formData => {
    // console.log('Auth submit clicked')
    // console.log('Auth Form data: ', formData)
    props.handleSubmitPress(formData)
  }
  let firstInput
  let secondInput
  // In order to manully focus to different TextFields: See example to move focus to ref= secondInput Below
  // IF using TextInput from 'react-native use =: secondInput.getRenderedComponent().refs.secondInput.focus()
  // IF using Input from 'native-base' use: secondInput.getRenderedComponent().refs.secondInput._root.focus()
  const urlPath = window.location.href.split('/')
  const route = urlPath[3] || props.authType

  return (
    <div>
      {props.fetching ? (
        <Loading />
      ) : (
        <Div>
          {route !== 'passwordReset' ? (
            <Div>
              <Field
                name='email'
                placeholder='email'
                style={{}}
                size='large'
                type='email'
                icon='mail'
                component={ReduxFormTextInput}/>
              <Field
                name='password'
                placeholder='password'
                style={{}}
                size='large'
                type='password'
                icon='lock'
                component={ReduxFormTextInput}/>
            </Div>
          ) : (
            <Div>
              <Helmet title='passwordReset' />
              <Field
                name='email'
                placeholder='email'
                style={{}}
                size='large'
                type='email'
                icon='mail'
                component={ReduxFormTextInput}/>
            </Div>
          )}
          <StyledError>{authError}</StyledError>
          <div>
            <Div3>
              <StyledSubmitButton basic={true} onClick={handleSubmit(onSubmit)}>
                {route === 'signUp'
                  ? 'Register'
                  : route === 'signIn'
                    ? 'Login'
                    : route === 'passwordReset'
                      ? 'Reset Password'
                      : 'Submit'}{' '}
              </StyledSubmitButton>
              {route === 'signIn' || route === 'signUp' ? (
                <Div3>
                  <Helmet title='Auth' />
                  <Divider style={{width: '220px'}} horizontal={true}>
                    Or
                  </Divider>
                  <Div2>
                    <Button
                      color='google plus'
                      style={{textTransform: 'capitalize'}}
                      onClick={() => {
                        props.handleSignInWithGoogle()
                      }}>
                      <Icon name='google' /> Google
                    </Button>
                    <Button
                      color='facebook'
                      style={{textTransform: 'capitalize'}}
                      onClick={() => {
                        props.handleSignInWithFacebook()
                      }}>
                      <Icon name='facebook' /> Facebook
                    </Button>
                  </Div2>
                </Div3>
              ) : null}
            </Div3>
            {route === 'signIn' ? (
              <div>
                <P
                  onClick={() => {
                    props.handlePasswordResetPress()
                  }}>
                  forgot your password ?
                </P>
              </div>
            ) : null}
          </div>
        </Div>
      )}
    </div>
  )
}

Auth.propTypes = {
  handleSubmitPress: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  authed: PropTypes.bool.isRequired,
  authError: PropTypes.string.isRequired,
  authType: PropTypes.string.isRequired,
}

const Div = styled('div')`
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Div2 = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* max-width: 96vw; */
  text-transform: capitalize;
`
const Div3 = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const P = styled('p')`
  cursor: pointer;
  text-align: center;
  margin-top: 2vh !important;
`

const StyledError = styled('p')`
  color: tomato;
  font-size: 0.85em;
`

const StyledSubmitButton = styled(Button)`
  margin-bottom: 5vh !important;
`

const validate = (values, props) => {
  const error = {}
  error.email = ''
  error.password = ''
  let ema = values.email
  let pw = values.password
  if (values.email === undefined) {
    ema = ''
  }
  if (values.password === undefined) {
    pw = ''
  }
  if (ema.length < 7 && ema !== '') {
    error.email = 'too short'
  }
  if (!ema.includes('@') && ema !== '') {
    error.email = '@ not included'
  }
  if (props.authType !== 'PasswordReset') {
    if (pw.length < 5 && pw.length > 0) {
      error.password = 'Weak password'
    }
  }
  return error
}

export default reduxForm({
  form: 'Auth',
  destroyOnUnmount: true,
  validate,
})(Values)
