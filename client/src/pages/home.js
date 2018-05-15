import React, { Component } from 'react';
import Hero from '../components/Hero';
// import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { Section } from '../components/UI/section';
import { connect } from 'react-redux';
import HomePostList from '../components/HomePostList';
import BouncingLoader from '../components/UI/loader';
import { getAll } from '../actions/boatActions';


class Home extends Component {
  async componentDidMount() {
    this.props.getAll();
  }

  render() {
    if (!this.props.isLoaded) return <BouncingLoader />;
    return (
      <React.Fragment>
        <Hero />
        <Section>
          <HomePostList boats={this.props.boats} />
        </Section>
      </React.Fragment>
    );
  }
}


const mapDispatchToProps = dispatch => bindActionCreators({
  getAll,
}, dispatch);

const mapStateToProps = state => ({
  boats: state.boat.boats,
  isLoaded: state.boat.isLoaded,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

