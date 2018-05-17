import styled from 'styled-components';
// import { vars } from '../../vars';

export const Section = styled.section`
  padding-top: 2em;
  padding-left: 1em;
  padding-right: 1em;
  background: ${props => (props.grey ? '#F1F1EF' : 'white')};
  height: ${props => (props.fullHeight ? 'calc(100vh - 80px)' : '100%')};
`;
