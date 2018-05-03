import React, { Component } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    if (this.props.nav.isOpen) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'auto'
    }
    return (
      <React.Fragment>
        <Navigation />
        <Hero />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav
})
export default connect(mapStateToProps, null)(App);
