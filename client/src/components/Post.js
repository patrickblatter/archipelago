import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import vars from '../vars';

class Post extends Component {
  render() {
    return (
      <React.Fragment>
        <PostWrapper>
          <Link to="/boat/_ID" style={{ textDecoration: 'none' }}>
            <PostHeader>
              <Overlay>
                <PostTitle>{this.props.title}</PostTitle>
              </Overlay>
              <img src={`https://s3.eu-central-1.amazonaws.com/archipelago-files/${this.props.images[0]}`} alt="" />
            </PostHeader>
            <PostBody>
              <PostDescription>{this.props.description}</PostDescription>
              <p>${this.props.pricePerDay}/day</p>
            </PostBody>
          </Link>
        </PostWrapper>
      </React.Fragment>
    );
  }
}
export default Post;


const PostWrapper = styled.div`
  margin: 0 auto;
  width: 90%;
  margin-bottom: 1em;
`;

const PostHeader = styled.div`
  position: relative;
  img {
    border-radius: 3px 3px 0 0;
    display: block;
    object-fit: cover;
    width: 100%;
  }
`;

const Overlay = styled.div`
  border-radius: 3px 3px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0,0,0,0.3);
`;

const PostTitle = styled.h4`
  margin-top: 0;
  margin-bottom: 0.5em;
  margin-right: 0.5em;
  color: ${vars.white};
  font-family: ${vars.fontTitle};
  letter-spacing: 1.4px;
`;

const PostBody = styled.div`
  font-family: ${vars.fontText};
  display: flex;
  flex-direction: column;
  color: black;
  text-decoration: none;
  border-left: 1px solid ${vars.grey};
  border-bottom: 1px solid ${vars.grey};
  border-right: 1px solid ${vars.grey};
  border-radius: 0 0 3px 3px;
  padding: 0 0.5em 0.5em;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);

  

  p:last-of-type{
    align-self: flex-end;
    color: ${vars.blue};
    font-weight: 700;
    font-family: ${vars.fontTitle};
    margin: 0;
  }
`;

const PostDescription = styled.p`
  margin-top: 0.9em;
  margin-bottom: 0.6em;
  font-size: 0.8em;
  line-height: 1.3
`;