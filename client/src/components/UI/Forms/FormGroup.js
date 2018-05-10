import styled from 'styled-components';
import vars from '../../../vars';

const FormGroup = styled.div`
  width: 100%;
  label, input, textarea {
    display: block;
  }

  input, textarea {
    border: 1px solid ${vars.blue};
    box-sizing: border-box;
    margin-bottom: 0.6em;
    margin-right: 0;
    width: 100%;
  }

  input {
    height: 2em;
    padding: 3px 5px;
  }


  label {
    margin-bottom: 0.25em;
  }

  
`;

export default FormGroup;

