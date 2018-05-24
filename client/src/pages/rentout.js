import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import { Section } from '../components/UI/section';
import FormIntro from '../components/UI/Forms/FormIntro';
import FormGroup from '../components/UI/Forms/FormGroup';
import { Button } from '../components/UI/button';
import { getToken } from '../localStorage';
import vars from '../vars';
import { Box, FormErrorBox } from '../components/UI/infoBox';

class RentOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      pricePerDay: undefined,
      images: [],
      statusSuccess: undefined,
      statusError: undefined,
      formErrors: [],
    };
  }

  onTitleChange(event) {
    this.setState({
      title: event.target.value,
    });
  }

  onDescriptionChange(event) {
    this.setState({
      description: event.target.value,
    });
  }

  onPricePerDayChange(event) {
    this.setState({
      pricePerDay: event.target.value,
    });
  }

  onImagesChange(event) {
    if (event.target.files.length > 0) {
      const images = this.state.images.slice();
      for (let i = 0; i < event.target.files.length; i += 1) {
        images.push(event.target.files[i]);
      }

      this.setState({
        images,
      }, () => {

      });
    }
  }

  onSubmit(event) {
    this.setState({
      statusSuccess: undefined,
      statusError: undefined,
      formErrors: [],
    });
    event.preventDefault();
    const errors = this.validateForm();
    if (errors.length > 0) {
      this.setState({ formErrors: errors });
    } else {
      const {
        title, description, images, pricePerDay,
      } = this.state;

      // Create form data
      const data = new FormData();
      data.append('title', title);
      data.append('description', description);
      data.append('pricePerDay', pricePerDay);
      if (images.length) {
        images.forEach((file) => {
          data.append('files[]', file);
        });
      }


      const token = getToken();
      if (this.props.isLoggedIn && token !== null) {
        axios.post('http://localhost:3001/boats', data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
          .then((response) => {
            this.setState({
              title: '',
              description: '',
              pricePerDay: undefined,
              images: [],
              statusSuccess: 'Your post was submitted successfully',
              statusError: undefined,
            });
          })
          .catch((error) => {
            this.setState({
              statusError: 'Ooooops. Something went wrong. Please try again',
              statusSuccess: undefined,
            });
          });
      } else {
        this.setState({
          statusError: 'Please log in to submit a new boat',
        });
      }
    }
  }


  validateForm() {
    const errors = [];

    if (this.state.title.length < 1) {
      errors.push('Please enter a title');
    }

    if (this.state.description.length < 10) {
      errors.push('Description must be atleast 10 characters long');
    }

    if (this.state.pricePerDay === undefined) {
      errors.push('Enter a valid price');
    }
    return errors;
  }

  render() {
    return (
      <Section>
        {this.state.statusError !== undefined &&
          <Box>
            <p>{this.state.statusError}</p>
          </Box>
        }

        { this.state.formErrors.length > 0 &&
          <FormErrorBox>{this.state.formErrors.map(error => <p key={error}>{error}</p>)}
          </FormErrorBox>
        }

        {this.state.statusSuccess !== undefined &&
          <Box success><p>{this.state.statusSuccess}</p></Box>
        }

        <FormIntro>
          To get your boat listed on our website, please fill out the form below
        </FormIntro>
        <RentOutForm encType="multipart/form-data">

          <FormGroup>
            <label htmlFor="">Title:*</label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={this.state.title}
              onChange={this.onTitleChange.bind(this)}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="">Description:*</label>
            <textarea
              name="desc"
              id="desc"
              cols="30"
              rows="5"
              required
              value={this.state.description}
              onChange={this.onDescriptionChange.bind(this)}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="">Price per day:*</label>
            <input
              type="number"
              name="pricePerDay"
              id="pricePerDay"
              required
              value={this.state.pricePerDay}
              onChange={this.onPricePerDayChange.bind(this)}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="">Images:</label>
            <input
              type="file"
              name="images"
              id="images"
              multiple
              onChange={this.onImagesChange.bind(this)}
            />
          </FormGroup>

          <Button primary onClick={this.onSubmit.bind(this)}>Submit</Button>
        </RentOutForm>
      </Section>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
});
export default connect(mapStateToProps, null)(RentOut);

const RentOutForm = styled.form`
  textarea {
    display:100%;
    padding: 7px 5px;
  }

  input:last-of-type{
    margin-bottom: 1em;
  }

  input[type="file"] {
    border: none;
    padding: 0;
  }
`;

const TextAreaWrapper = styled.div`
`;

