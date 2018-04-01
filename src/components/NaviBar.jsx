import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { firebase } from '../firebase';
import './css/NaviBar.css';

export default class NaviBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      signInOut: 'Sign in'
    }

    }

    componentDidMount() {

      firebase.auth().onAuthStateChanged(user => {

        if(user) {

          firebase.database().ref('/users/' + user.uid).once('value').then(snapshot => {
            this.setState({ // Set values to current user's data
              fitnessChoice: (snapshot.val() && snapshot.val().fitnessChoice),
            });
          });
          // If user is logged in, set menu item in nav bar to read 'sign out'
          this.setState({signInOut: 'Sign out'})
          }
          else {
            // If user isn't logged in, set menu item to read 'sign in'
            this.setState({signInOut: 'Sign in'});
          }
      });
    }

    render() {
      return (

        <nav>
          <Navbar fluid>

            <Navbar.Header>
              <Navbar.Brand componentClass='span'>
                <NavLink className='link header' to='/'>FitnessHelper</NavLink>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>

            <Navbar.Collapse>

              <Nav>
                <NavItem eventKey={1} componentClass='span'>
                  <NavLink className='link' to='/diet' activeStyle={{'text-decoration': 'none', color: '#00E676'}}>Diet</NavLink>
                </NavItem>
                <NavItem eventKey={2} componentClass='span'>
                  <NavLink className='link' to='/exercise' activeStyle={{'text-decoration': 'none', color: '#00E676'}}>Exercise</NavLink>
                </NavItem>
              </Nav>

              <Nav pullRight>
                <NavDropdown eventKey={3} title="Settings" id="nav-dropdown">
                  <MenuItem eventKey={3.1} componentClass='span'>
                    <NavLink className='link dropdown' to='/account' activeStyle={{color: '#00E676'}}>Account</NavLink>
                  </MenuItem>
                  <MenuItem eventKey={3.2} componentClass='span'>
                    <NavLink className='link dropdown' to='/about_us' activeStyle={{color: '#00E676'}}>About us</NavLink>
                  </MenuItem>
                  <MenuItem eventKey={3.3} componentClass='span'>
                    <NavLink className='link dropdown' to='/contact_us' activeStyle={{color: '#00E676'}}>Contact us</NavLink>
                  </MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.4} componentClass='span'
                    // On click, if user is logged in then sign out, but if user isn't logged in then direct to login page
                    onClick={() => {(this.state.signInOut === 'Sign out') ? firebase.auth().signOut() : this.props.history.push('/login')}}
                    >
                    <a className='link dropdown signOut'>{this.state.signInOut}</a>
                  </MenuItem>
                </NavDropdown>
              </Nav>

            </Navbar.Collapse>

          </Navbar>
        </nav>

      )
    }

  }
