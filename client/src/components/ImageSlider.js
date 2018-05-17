import React, { Component } from 'react';
import styled from 'styled-components';

class ImageSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  componentDidMount() {
    document.slide.src = this.props.images[this.state.counter];
  }

  componentWillUnmount() {
  }

  changeImg() {
    let i = this.state.counter;
    if (this.state.counter < this.props.images.length - 1) {
      i += 1;
      this.setState({
        counter: i,
      });
    } else {
      this.setState({ counter: 0 });
    }

    document.slide.src = this.props.images[this.state.counter];
  }


  render() {
    return (
      <GalleryContainer>
        <img name="slide" />
        <Arrows>
          <ArrowLeft />
          <ArrowRight onClick={this.changeImg.bind(this)} />
        </Arrows>
      </GalleryContainer>
    );
  }
}
export default ImageSlider;

const GalleryContainer = styled.div`
  width: 100%;
  height: 250px;
  position: relative;
  display: flex;

  img {
    width: inherit;
    height: inherit;
  }
`;

const Arrows = styled.div`
position: absolute;
  width: inherit;
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ArrowLeft = styled.div`
  
  width: 0; 
  height: 0; 
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent; 
  border-right:20px solid white; 
  margin-left: 0.5em;
  cursor: pointer;
`;

const ArrowRight = styled.div`
  width: 0; 
  height: 0; 
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent; 
  border-left:20px solid white; 
  margin-right: 0.5em;
  cursor: pointer;
`;

