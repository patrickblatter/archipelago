import React, { Component } from 'react';
import styled from 'styled-components';
import vars from '../vars';

class Navigation extends Component {
  render() {
    return (
      <Nav>
        <InnerNav>
          <Title>Archipelago</Title>
          <Button>
            <Line />
            <Line />
            <Line />
          </Button>
        </InnerNav>
      </Nav>
    )
  }
}
export default Navigation;

const Nav = styled.nav`
  height: 48px;
  padding-left: 8px;
  padding-right: 8px;
`;

const InnerNav = styled.div`
  display: flex;
  justify-content: space-between;
  
`;

const Button = styled.button`
  width: 40px;
  height: 48px;
  border: none;
  cursor: pointer;
  padding: 0 8px;
  background: transparent;
`

const Line = styled.span`
  width: 24px;
  display: block;
  background: ${vars.blue};
  height: 2px;
  margin-bottom: 5px;
` 

const Title = styled.h1`
  font-family: ${vars.fontTitle};
  font-size: 1em;
  color: ${vars.blue};
  margin:0;
  align-self: center;
`
const Seperator = styled.hr`
  margin: 0;
  height: 1px;
  border: 0;
  border-top: 1px solid rgba(199,199,199,0.2);
`



