import React, { Component } from 'react';
import Navigation from './components/Navigation';
import Home from './pages/home';
import { connect } from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class App extends Component {
  render() {
    if (this.props.nav.isOpen) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'auto'
    }
    return (
        <Router>
          <React.Fragment>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
          </React.Fragment>
        </Router>
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav
})
export default connect(mapStateToProps, null)(App);
