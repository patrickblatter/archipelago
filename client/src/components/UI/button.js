import styled from 'styled-components';
import vars from '../../vars';

export const Button = styled.button`
  width: 100%;
  color: ${props => (props.primary ? vars.white : vars.black)};
  background-color: ${props => (props.primary ? vars.blue : 'transparent')};
  border: none;
  padding: 0 1em;
  height: 2.2em;
  font-family: ${vars.fontTitle};
  text-transform: uppercase;
  letter-spacing: 2px;
`;
