import React, { Component } from 'react';
import Hero from '../components/Hero';
// import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { Section } from '../components/UI/section';
import { connect } from 'react-redux';
import HomePostList from '../components/HomePostList';
import BouncingLoader from '../components/UI/loader';
import { getAll, getLimit } from '../actions/boatActions';


class Home extends Component {
  async componentWillMount() {
    if (!this.props.boatsLoaded) {
      await this.props.getLimit(1);
    }
  }

  render() {
    if (!this.props.boatsLoaded) return <BouncingLoader />;
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
  getLimit,
}, dispatch);

const mapStateToProps = state => ({
  boats: state.boat.boats,
  boatsLoaded: state.boat.boatsLoaded,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

