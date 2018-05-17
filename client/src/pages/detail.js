import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { getOne, clearOne } from '../actions/boatActions';
import ImageSlider from '../components/ImageSlider';
import BouncingLoader from '../components/UI/loader';
import { Section } from '../components/UI/section';
import vars from '../vars';
import { Button } from '../components/UI/button';

class BoatDetail extends Component {
  async componentDidMount() {
    const { id } = this.props.match.params;
    await this.props.getOne(id);
  }

  componentWillUnmount() {
    this.props.clearOne();
  }


  render() {
    if (!this.props.boatLoaded) return <BouncingLoader />;
    return (
      <React.Fragment>
        <ImageSlider images={this.props.boat.images} />
        <Section >
          <Wrapper>
            <Title>{this.props.boat.title}</Title>
            <Description>{this.props.boat.description}</Description>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.

Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.

Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.

Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.

At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            </p>
          </Wrapper>


          <CTA>
            <Price>
              <p>Price Per Day</p>
              <p>${this.props.boat.pricePerDay}</p>
            </Price>
            <CTAButton>Book now</CTAButton>
          </CTA>
        </Section>
      </React.Fragment>


    );
  }
}

const mapStateToProps = state => ({
  boat: state.boat.boat,
  boatLoaded: state.boat.boatLoaded,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getOne,
  clearOne,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(BoatDetail);


const Wrapper = styled.div`
  display: block;
  padding-bottom: 100px;
`;

const Title = styled.h3`
  font-family: ${vars.fontText};
  color: ${vars.black};
  margin: 0;
`;

const Description = styled.p`
  color: ${vars.black};
`;

const CTA = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-top: 1px solid ${vars.grey};
  background-color: ${vars.white};
  height: 100px;
`;

const CTAButton = Button.extend`
  width: 125px;
  font-size: 1em;
  line-height: 1.41;
  height:4em;
  color: ${vars.white};
  background: ${vars.blue};
  font-weight: 700;
  margin: 0.8em;
  border-radius: 3px;
`;

const Price = styled.div`
  display: flex;
  flex-direction:column;
  align-items: center;

  p {
    margin: 0.1em 0;
    font-family: ${vars.fontTitle};
    font-size: 0.9em;
  }

  p:nth-child(2) {
    color: ${vars.blue}
  }


`;
