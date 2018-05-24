import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { getOne, clearOne } from '../actions/boatActions';
import { createRental } from '../actions/rentalAction';
import ImageSlider from '../components/ImageSlider';
import BouncingLoader from '../components/UI/loader';
import { Section } from '../components/UI/section';
import vars from '../vars';
import { Button } from '../components/UI/button';
import { getToken } from '../localStorage';
import FormGroup from '../components/UI/Forms/FormGroup';
import FormIntro from '../components/UI/Forms/FormIntro';
import { FormErrorBox } from '../components/UI/infoBox';

class BoatDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      startDate: undefined,
      endDate: undefined,
      totalDays: undefined,
      total: undefined,
      formErrors: [],
    };
    this.calculateDays = this.calculateDays.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.createRental = this.createRental.bind(this);
  }

  async componentWillMount() {
    const { id } = this.props.match.params;
    await this.props.getOne(id);
  }

  componentWillUnmount() {
    this.props.clearOne();
  }

  openModal() {
    document.body.style.overflow = 'hidden';
    this.setState({ modalOpen: true });
  }

  resetState() {
    this.setState({
      modalOpen: false,
      startDate: undefined,
      endDate: undefined,
      totalDays: undefined,
      total: undefined,
      formErrors: [],
    });
  }

  closeModal() {
    document.body.style.overflow = 'auto';
    this.setState({
      modalOpen: false,
      startDate: undefined,
      endDate: undefined,
      totalDays: undefined,
      total: undefined,
      formErrors: [],
    });
  }

  async onChangeStartDate(event) {
    const input = event.target.value;
    const startDate = await new Date(input);
    this.setState({ startDate });
    this.calculateDays();
  }

  async onChangeEndDate(event) {
    const input = event.target.value;
    const endDate = await new Date(input);
    this.setState({ endDate });
    this.calculateDays();
  }

  calculateDays() {
    const oneDay = 1000 * 60 * 60 * 24;
    if (this.state.startDate !== undefined && this.state.endDate !== undefined) {
      const { startDate, endDate } = this.state;
      const difference = endDate.getTime() - startDate.getTime();

      const daysInBetween = Math.ceil(difference / oneDay) + 1;
      if (this.state.endDate < this.state.startDate) {
        this.setState({
          totalDays: 0,
          total: 0,
        });
      } else {
        this.setState({
          totalDays: daysInBetween,
          total: daysInBetween * this.props.boat.pricePerDay,
        });
      }
    }
  }

  validateForm() {
    const errors = [];

    const token = getToken();
    if (token !== null) {
      if (this.state.startDate === undefined || this.state.endDate === undefined) {
        errors.push('Please set start and end date');
      }
      if (this.state.endDate < this.state.startDate) {
        errors.push('Start date can\'t be behind end date!');
      }

      const dateNow = new Date();
      dateNow.setHours(0, 0, 0, 0);
      if (this.state.startDate < dateNow) {
        errors.push('Start date is in the past!');
      }
    } else {
      errors.push('You must be logged in to rent out a boat!');
    }

    return errors;
  }

  createRental(event) {
    event.preventDefault();
    const errors = this.validateForm();
    if (!errors.length) {
      this.props.createRental(
        this.props.user._id,
        this.props.boat._id,
        this.props.boat.pricePerDay,
        this.state.startDate,
        this.state.endDate,
        getToken(),
      );
    }
    this.setState({ formErrors: errors });
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
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam era
            </p>
          </Wrapper>


          <CTA>
            <Price>
              <p>Price Per Day</p>
              <p>${this.props.boat.pricePerDay}</p>
            </Price>
            <CTAButton onClick={this.openModal.bind(this)}>Book now</CTAButton>
          </CTA>
        </Section>

        { this.state.modalOpen &&
          <BookModal>
            <BookWrapper>

              { this.state.formErrors.length > 0 &&
              <FormErrorBox>
                {this.state.formErrors.map(err => <p key={err}>{err}</p>)}
              </FormErrorBox>}


              <ButtonClose onClick={this.closeModal.bind(this)}>
                <React.Fragment>
                  &#10006;
                </React.Fragment>
              </ButtonClose>
              <FormIntro>
                Please Select the dates for which yu would like to book the boat
              </FormIntro>
              <form action="">

                <FormGroup>
                  <label htmlFor="">Start Date:</label>
                  <input
                    onChange={this.onChangeStartDate}
                    type="date"
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="">End Date:</label>
                  <input
                    type="date"
                    onChange={this.onChangeEndDate}
                  />
                </FormGroup>


                <h3>Days: {this.state.totalDays}</h3>
                <h3>Total: ${this.state.total}</h3>
                <Button
                  primary
                  onClick={this.createRental}
                >Book Now
                </Button>
              </form>
            </BookWrapper>
          </BookModal>
        }
      </React.Fragment>


    );
  }
}

const mapStateToProps = state => ({
  boat: state.boat.boat,
  boatLoaded: state.boat.boatLoaded,
  user: state.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getOne,
  clearOne,
  createRental,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(BoatDetail);


const Wrapper = styled.div`
  display: block;
  padding-bottom: 85px;
`;

const Title = styled.h3`
  font-family: ${vars.fontText};
  color: ${vars.black};
  margin: 0;
  font-size: 1em;
`;

const Description = styled.p`
  color: ${vars.black};
  font-size: 0.87em;
  line-height: 1.41;
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
  height: 80px;
`;

const CTAButton = Button.extend`
  width: 125px;
  font-size: 0.9em;
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
    color: ${vars.blue};
    font-size: 1em;
  }
`;

const BookModal = styled.div`
  height: 100vh;
  background: white;
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const BookWrapper = styled.div`
  height: 100%;
  margin: 1em 0.5em;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ButtonClose = Button.extend`
  color: ${vars.blue};
  position: absolute;
  top: 0;
  right: 10px;
  font-size: 20px;
  margin-left: auto;
  width: auto;
  padding: 0;

  &:hover {
    color: ${vars.white};
  }
`;
