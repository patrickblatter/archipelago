import React, { Component } from 'react';

import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import RentOut from './pages/rentout';
import BoatDetail from './pages/detail';

class App extends Component {
  render() {
    if (this.props.nav.isOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
    return (
      <Router>
        <React.Fragment>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/rentout" component={RentOut} />
            <Route exact path="/boat/:id" component={BoatDetail} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});
export default connect(mapStateToProps, null)(App);
