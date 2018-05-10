import React, { Component } from 'react';
import styled from 'styled-components';
import { Section } from '../components/UI/section';
import FormIntro from '../components/UI/Forms/FormIntro';
import FormGroup from '../components/UI/Forms/FormGroup';
import { Button } from '../components/UI/button';

class RentOut extends Component {
  render() {
    return (
      <Section>
        <FormIntro>
          To get your boat listed on our website, please fill out the form below
        </FormIntro>
        <RentOutForm>

          <FormGroup>
            <label htmlFor="">Title:*</label>
            <input type="text" name="title" id="title" required />
          </FormGroup>

          <FormGroup>
            <label htmlFor="">Description:*</label>
            <textarea name="desc" id="desc" cols="30" rows="5" required />
          </FormGroup>

          <FormGroup>
            <label htmlFor="">Price per day:*</label>
            <input type="number" name="ppd" id="ppd" required />
          </FormGroup>

          <Button primary>Submit</Button>
        </RentOutForm>
      </Section>
    );
  }
}
export default RentOut;

const RentOutForm = styled.form`
  textarea {
    display:100%;
    padding: 7px 5px;
  }

  input:last-of-type{
    margin-bottom: 1em;
  }
`;

const TextAreaWrapper = styled.div`
`;

