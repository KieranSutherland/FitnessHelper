import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { Link, browserHistory } from 'react-router';
import { firebase } from '../firebase';
import './css/NaviBar.css';

export default class NaviBar extends Component {
  constructor(){
    super();
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

    exerciseClicked() {
      (this.state.fitnessChoice === 'gain') ? browserHistory.push('/exercise_gain') : browserHistory.push('/exercise_lose')
    }

    render() {
      return (

        <div>
          <Navbar fluid>

            <Navbar.Header>
              <Navbar.Brand componentClass='span'>
                <Link className='link header' to={'/home'}>FitnessHelper</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>

            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} componentClass='span'>
                  <Link className='link' to={'/diet'}>Diet</Link>
                </NavItem>
                <NavItem eventKey={2} componentClass='span'>
                  <Link className='link' onClick={() => this.exerciseClicked()}>Exercise</Link>
                </NavItem>
              </Nav>
              <Nav pullRight>
                <NavDropdown eventKey={3} title="Settings" id="nav-dropdown">
                  <MenuItem eventKey={3.1} componentClass='span'><Link className='link dropdown' to={'/account'}>Account</Link></MenuItem>
                  <MenuItem eventKey={3.2} componentClass='span'><Link className='link dropdown' to={'/contact_us'}>Contact us</Link></MenuItem>
                  <MenuItem eventKey={3.3} componentClass='span'><Link className='link dropdown' to={'/about_us'}>About us</Link></MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.4} componentClass='span'
                    // On click, if user is logged in then sign out, but if user isn't logged in then direct to login page
                    onClick={() => {(this.state.signInOut === 'Sign out') ? firebase.auth().signOut() : browserHistory.push('/login')}}>
                    <a className='link dropdown signOut'>{this.state.signInOut}</a>
                  </MenuItem>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>

          </Navbar>
        </div>

      )
    }

  }
