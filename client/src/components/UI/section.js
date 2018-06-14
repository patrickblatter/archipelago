import styled from 'styled-components';
// import { vars } from '../../vars';

export const Section = styled.section`
  padding-top: 2em;
  padding-left: 1em;
  padding-right: 1em;
  background: ${props => (props.grey ? '#F1F1EF' : 'white')};
  height: ${props => (props.fullHeight ? 'calc(100vh - 80px)' : '100%')};

  @media only screen and (min-width: 1024px) {
    padding-left: 2.5em;
    padding-right: 2.5em;
  }

  @media only screen and (min-width: 768px) {
    padding-left: 1.5em;
    padding-right: 1.5em;
  }
`;
