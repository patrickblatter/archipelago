import React, { Component } from 'react';
import styled from 'styled-components';
import { Section } from '../components/UI/section';
import vars from '../vars';
import { Button } from '../components/UI/button';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../actions/userActions';
import { Redirect } from 'react-router-dom';

import FormIntro from '../components/UI/Forms/FormIntro';
import FormGroup from '../components/UI/Forms/FormGroup';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      redirect: false,
    };
  }

  onChangePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  onChangeEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }

  async onSubmit(event) {
    event.preventDefault();
    try {
      if (this.validateForm()) {
        const response = await axios.post(
          'http://localhost:3001/users/login',
          {
            email: this.state.email,
            password: this.state.password,
          },
        );

        if (response.status === 200) {
          localStorage.setItem('token', response.data.token);
          this.props.login();
          this.setState({
            redirect: true,
          });
        }
      } else {

      }
    } catch (error) {
      console.log(error);
    }
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


    return true;
  }


  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <Section grey fullHeight>
        <FormIntro>
          I already have an Account
        </FormIntro>
        <SignupForm>
          <FormGroup>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              id="email"
              required
              onChange={this.onChangeEmail.bind(this)}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={this.onChangePassword.bind(this)}
            />
          </FormGroup>
          <Button primary onClick={this.onSubmit.bind(this)}>Login</Button>
        </SignupForm>

      </Section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  login,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Login);


const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  button {
    margin-top: 0.5em;
  }
`;

