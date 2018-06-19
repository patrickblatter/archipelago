import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { Section } from '../components/UI/section';
import FormIntro from '../components/UI/Forms/FormIntro';
import FormGroup from '../components/UI/Forms/FormGroup';
import { saveToken } from '../localStorage';
import { Button } from '../components/UI/button';
import { login } from '../actions/userActions';


class Signup extends Component {
  state = {
    email: '',
    emailError: '',
    passwordError: '',
    password: '',
    password2: '',
    redirect: false,
  }


  updateEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  }

  updatePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  }

  updatePassword2 = (event) => {
    this.setState({
      password2: event.target.value,
    });
  }

  validateForm() {
    const emailRegex = new RegExp('[A-Za-z0-9.:%+-]+@[a-z0-9.-]+[.][A-Za-z]{2,}');

    if (!emailRegex.test(this.state.email)) {
      this.setState({
        emailError: 'Invalid Email address',
      });
      return false;
    }

    if (this.state.password.length < 1) {
      this.setState({
        passwordError: 'Password is too short',
      });
      return false;
    }

    if (this.state.password !== this.state.password2) {
      this.setState({
        passwordError: "Passwords don't match",
      });
    }


    return true;
  }

  async onSubmit(event) {
    event.preventDefault();
    try {
      if (this.validateForm()) {
        const response = await axios.post(
          '/users/signup',
          {
            email: this.state.email,
            password: this.state.password,
          },
        );

        if (response.status === 200) {
          saveToken(response.data.token);
          this.props.login();
          this.setState({
            redirect: true,
          });
        }
      } else {
        console.log('ooops');
      }
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <Section grey fullHeight>
        <FormIntro>
          Register now
        </FormIntro>
        <SignupForm>
          <FormGroup>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              id="email"
              required
              onChange={this.updateEmail}
              // value={this.state.email}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={this.updatePassword}
              // value={this.state.password}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="password2">Confirm Password:</label>
            <input
              type="password"
              name="password2"
              id="password2"
              onChange={this.updatePassword2}
              // value={this.state.password2}
            />
          </FormGroup>

          <Button primary onClick={this.onSubmit.bind(this)}>Login</Button>
        </SignupForm>

      </Section>

    );
  }
}


const mapDispatchToProps = dispatch => bindActionCreators({
  login,
}, dispatch);

export default connect(null, mapDispatchToProps)(Signup);

const SignupForm = styled.form`

`;

