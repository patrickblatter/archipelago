import React, { Component } from 'react';
import styled from 'styled-components';
import vars from '../vars';

class Hero extends Component {
  render() {
    return (
      <HeroContainer>
        <HeroTitle>Aye Captain, welcome on board!</HeroTitle>
        <HeroText>Getting a boat has never been easier. Coast aloung the most beautiful islands of Sweden. We have the right boats waiting for you.</HeroText>
      </HeroContainer>
    )
  }
}
export default Hero;

const HeroContainer = styled.div`
  padding-left:1em;
  padding-right: 1em;
  height: calc(100vh - 48px);
  background-image: linear-gradient(rgba(119,210,222,0.8), rgba(119,219,222,0.8)), url('https://images.unsplash.com/photo-1520255870062-bd79d3865de7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bf9f05411ebec1834a079815976e93f3&auto=format&fit=crop&w=752&q=80');
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const HeroTitle = styled.h2`
  text-align: center;
  
  color: ${vars.white};
  font-size: 1.2em;
  font-family: ${vars.fontTitle};
`;

const HeroText = styled.p`
font-size: 1em;
line-height: 1.41;
  color: ${vars.white};
  text-align: center;
  font-family: ${vars.fontText};
`