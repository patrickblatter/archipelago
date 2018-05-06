import React, { Component } from 'react';
import Hero from '../components/Hero';
import Post from '../components/Post';
// import styled from 'styled-components';
import { Section } from '../components/UI/section';


class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <Hero />
        <Section>
          <Post />
        </Section>
      </React.Fragment>
    );
  }
}
export default Home;

