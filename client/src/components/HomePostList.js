import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Post from './Post';
import { getAll } from '../actions/boatActions';

class HomePostList extends Component {
  render() {
    const { boats } = this.props;

    return (
      <Grid>
        {boats.map(boat =>
        (<Post
          key={boat._id}
          id={boat._id}
          title={boat.title}
          description={boat.description}
          pricePerDay={boat.pricePerDay}
          images={boat.images}
        />),
      )}
      </Grid>
    );
  }
}
export default HomePostList;

const Grid = styled.div`
  @media only screen and (min-width: 425px) {

    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (min-width: 768px) {

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 1em;
  
  padding-top: 2em;
  }
`;

