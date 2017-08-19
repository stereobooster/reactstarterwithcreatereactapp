import React from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import {Button, Popup} from 'semantic-ui-react'

export default function Nav(props) {
  return (
    <Div>
      <StyledUl>
        <li>
          <StyledNavLink exact={true} to='/'>
            {' '}Home
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/aboutUs'> About US</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/faq'> FAQ</StyledNavLink>
        </li>
      </StyledUl>
      {props.authed
        ? <Div2>
            <Popup
              trigger={<StyledButton
                  compact={true}
                  circular={true}
                  basic={true}
                  icon='user circle'
                  onClick={() => {
                    props.handleSignOutPress()
                  }}/>}
              content='Sign-Out'
            />
          </Div2>
        : <Div2>
            <Popup
              trigger={<StyledButton
                  compact={true}
                  circular={true}
                  basic={true}
                  icon='user circle'
                  onClick={() => {
                    props.handleSignInPress()
                  }}/>}
              content='Sign-In'
            />
            <Popup
              trigger={<StyledButton
                  compact={true}
                  circular={true}
                  basic={true}
                  icon='add user'
                  onClick={() => {
                    props.handleSignUpPress()
                  }}/>}
              content='Register'
            />
          </Div2>}
    </Div>
  )
}

Nav.propTypes = {}.defaultProps = {}

const StyledUl = styled('ul')`
  display: flex;
  justify-content: center;
  align-items: center;
  & li {
    margin-right: 2vw;
    list-style: none;
  }`

const StyledNavLink = styled(NavLink).attrs({
  activeClassName: 'navItemActive',
})`
  text-decoration: none;
  &.navItemActive {
    font-weight: bold;
  }`

const StyledButton = styled(Button)`
  /* width: 120px; */
  margin-right: 2vw !important;
  `

const Div = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  `

const Div2 = styled('div')`
    margin-right: 2vw;
  `