import styled from 'styled-components';
import vars from '../../vars';

export const Box = styled.div`
  background: ${props => (props.success ? `${vars.greenSuccessBackround}` : `${vars.redErrorBackground}`)};
  color: ${props => (props.success ? `${vars.greenSuccessText}` : `${vars.redErrorText}`)};
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    margin: 0.5em;
    width: 80%;
    text-align: center;
  }
`;

export const FormErrorBox = Box.extend`
  flex-direction: column;
  align-items:center;
  justify-content: center;
  text-align: center;
`;

