import React from 'react';
import styled, { keyframes } from 'styled-components';

const BouncingLoader = () => (
  <Loader>
    <div />
    <div />
    <div />
  </Loader>

);
export default BouncingLoader;

const bounceAnimation = keyframes`
from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0.1;
    transform: translateY(-1rem);
  }

`;

const Loader = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content:center;
  align-items: center;
  
  animation: ${bounceAnimation} 0.6s infinite alternate;

  div {
    width: 1rem;
    height: 1rem;
    margin: 3rem 0.2rem;
    background: #8385aa;
    border-radius: 50%;
  }
  
  &div:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  &div:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

