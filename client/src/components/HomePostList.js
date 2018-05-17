import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Post from './Post';
import { getAll } from '../actions/boatActions';

class HomePostList extends Component {
  render() {
    const { boats } = this.props;

    return (
      boats.map(boat =>
        (<Post
          key={boat._id}
          id={boat._id}
          title={boat.title}
          description={boat.description}
          pricePerDay={boat.pricePerDay}
          images={boat.images}
        />),
      )
    );
  }
}
export default HomePostList;

