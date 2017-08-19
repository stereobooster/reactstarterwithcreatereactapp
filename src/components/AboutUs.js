import React from 'react'
import styled from 'styled-components'
import {Helmet} from 'react-helmet'

const AboutUs = () => {
  return (
         <Div>
        <Helmet title= 'AboutUs'/>
           AboutUs
         </Div>
    )
}

export default AboutUs

const Div = styled('div')`
  width: 100%;
  height:100%;
  display: flex;
  justify-content: center;
  `
