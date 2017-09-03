import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Form, Input} from 'semantic-ui-react'
import styled from 'styled-components'

export default class ReduxFormTextInput extends Component {
  render() {
    const {
      input,
      refField,
      label,
      type,
      icon,
      meta: {touched, error, warning},
      ...rest
    } = this.props
    let hasError = false
    if (error !== undefined) {
      hasError = true
    }
    return (
      <StyledForm warning={true} size={rest.size || 'large'}>
        <Form.Field
          required={rest.required || false}
          error={!!(hasError && touched)}>
          <label>
            {label || ''}
          </label>
          <input
            type={type ? type : 'text'}
            placeholder={rest.placeholder || ''}
            {...input}/>
        </Form.Field>
        <P showError={hasError && touched}>
          {error || 'error'}
        </P>
      </StyledForm>
    )
  }
}

const P = styled('p')`
  color:tomato;
  font-size:0.85em;
  visibility: ${props => (props.showError ? 'visible' : 'hidden')};
  `
const StyledForm = styled(Form)`
  width:420px;
  max-width: 96vw !important;
  `
