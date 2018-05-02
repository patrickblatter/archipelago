import React, { Component } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navigation />
        <Hero />
      </React.Fragment>
    );
  }
}

export default App;
