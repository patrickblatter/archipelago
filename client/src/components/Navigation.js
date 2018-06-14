import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import vars from '../vars';
import { toggleNav } from '../actions/navActions';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';
import { removeToken } from '../localStorage';

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  logout() {
    removeToken();
  }

  render() {
    return (
      <Nav>
        <InnerNav>
          <Title>Archipelago</Title>
          <Button onClick={this.props.toggleNav}>
            <Line />
            <Line />
            <Line />
          </Button>
        </InnerNav>
        { this.props.nav.isOpen &&
          <React.Fragment>
            <SideNavOverlay onClick={this.props.toggleNav} />
            <SideNavContainer>
              <ButtonClose onClick={this.props.toggleNav}>
                <React.Fragment>
                  &#10006;
                </React.Fragment>
              </ButtonClose>
              <Menu>
                <MenuItem>
                  <StyledLink to="/" onClick={this.props.toggleNav}>Home</StyledLink>
                </MenuItem>
                <MenuItem>
                  <StyledLink to="/boats" onClick={this.props.toggleNav}>View Boats</StyledLink>
                </MenuItem>
                <MenuItem>
                  <StyledLink to="/rentout" onClick={this.props.toggleNav}>Rent out your Boat</StyledLink>
                </MenuItem>
                { !this.props.user.isLoggedIn &&
                <MenuItem>
                  <StyledLink to="/login" onClick={this.props.toggleNav}>Login</StyledLink>
                </MenuItem>
                }
                { this.props.user.isLoggedIn &&
                <MenuItem>
                  <StyledLink to="/login" onClick={this.logout && this.props.logout}>Logout</StyledLink>
                </MenuItem>
                }
                <MenuItem>
                  <StyledLink to="/signup" onClick={this.props.toggleNav}>Sign Up</StyledLink>
                </MenuItem>
                <MenuItem>
                  <StyledLink to="/">Dashboard</StyledLink>
                </MenuItem>
              </Menu>
            </SideNavContainer>
          </React.Fragment>
      }
      </Nav>
    );
  }
}


const mapStateToProps = state => ({
  nav: state.nav,
  user: state.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleNav,
  logout,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

const Nav = styled.nav`
  /* padding-left: 8px;
  padding-right: 8px; */
`;

const InnerNav = styled.div`

  height: 48px;
  display: flex;
  padding-left: 8px;
  padding-right: 8px;
  justify-content: space-between;
  @media only screen and (min-width: 1024px){
    padding: 0;
    margin: 0 3em;
    height: 60px;
    
    button {
      height: 60px;
    }
    h1 {
      font-size: 1.6em;
    }
  }

  
`;

const Button = styled.button`
  width: 40px;
  height: 48px;
  border: none;
  cursor: pointer;
  padding: 0 8px;
  background: transparent;

  @media only screen and (min-width: 1024px) {
    height: 58px;
    width: 50px;
    font-size: 30px;
  }
`;

const Line = styled.span`
  width: 24px;
  display: block;
  background: ${vars.blue};
  height: 2px;
  margin-bottom: 5px;
`;

const Title = styled.h1`
  font-family: ${vars.fontTitle};
  font-size: 1em;
  color: ${vars.blue};
  margin:0;
  align-self: center;
  @media only screen and (min-width: 425px){
    font-size: 1.2em
  }

  @media only screen and (min-width: 725px){
    font-size: 1.4em
  }
`;
const SideNavOverlay = styled.div`
  background-color: rgba(39,39,39,0.9);
  position: absolute;
  z-index: 800;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
`;

const SideNavContainer = styled.div`
  position: absolute;
  z-index: 801;
  top: 0;
  right: 0;
  bottom: 0;
  width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: rgba(39,39,39,1);

  @media only screen and (min-width: 1024px) {
    width: 250px;
    ul {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    li {
      margin-bottom: 2em;

      a {
        font-size: 1.3em;
      }
    }

    li:first-of-type {
      margin-top: 2em;
    }



  }
`;

const ButtonClose = Button.extend`
  color: ${vars.grey};
  font-size: 20px;
  margin-left: auto;

  &:hover {
    color: ${vars.white};
  }
`;

const Menu = styled.ul`
  list-style: none;
  padding-left: 0.8em;
`;

const MenuItem = styled.li`
  margin-bottom: 1.35em;
`;

const StyledLink = styled(Link)`
  color: ${vars.white};
  text-decoration: none;
  font-size: 0.9em;
  font-family: ${vars.fontTitle};
  transition: 0.35s all;
  letter-spacing: 1px;

  &:hover {
    color: ${vars.orange};
  }
`;

