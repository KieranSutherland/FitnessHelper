import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { Link } from 'react-router';
import { firebaseApp } from '../firebase';
import './NaviBar.css';

export default class NaviBar extends Component {
  constructor(){
    super();
    this.state = {

    }

    }

    render() {
      return (

        <div>
          <Navbar>

            <Navbar.Header>
              <Navbar.Brand>
                <a className='header'><Link className='link' to={'/home'}>FitnessHelper</Link></a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>

            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} href="#">
                  <Link className='link' to={'/diet'}>Diet</Link>
                </NavItem>
                <NavItem eventKey={2} href="#">
                  <Link className='link' to={'/exercise'}>Exercise</Link>
                </NavItem>

                <NavDropdown eventKey={3} title="Profile" id="nav-dropdown">
                  <MenuItem eventKey={3.1}><Link className='link' to={'/account'}>Account</Link></MenuItem>
                  <MenuItem eventKey={3.2}><Link className='link' to={'/contact_us'}>Contact us</Link></MenuItem>
                  <MenuItem eventKey={3.3}><Link className='link' to={'/about_us'}>About us</Link></MenuItem>
                  <MenuItem divider />
                  <MenuItem
                    className='signOut'
                    eventKey={3.4}
                    onClick={() => firebaseApp.auth().signOut()}>
                    Sign out</MenuItem>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>

          </Navbar>
        </div>

      )
    }

  }
