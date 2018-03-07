import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { Link } from 'react-router';
import { firebase } from '../firebase';
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
          <Navbar fluid>

            <Navbar.Header>
              <Navbar.Brand componentClass='reset'>
                <Link className='link header' to={'/home'}>FitnessHelper</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>

            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} componentClass='reset'>
                  <Link className='link' to={'/diet'}>Diet</Link>
                </NavItem>
                <NavItem eventKey={2} componentClass='reset'>
                  <Link className='link' to={'/exercise'}>Exercise</Link>
                </NavItem>
              </Nav>
              <Nav pullRight>
                <NavDropdown eventKey={3} title="Profile" id="nav-dropdown">
                  <MenuItem eventKey={3.1} componentClass='reset'><Link className='link dropdown' to={'/account'}>Account</Link></MenuItem>
                  <MenuItem eventKey={3.2} componentClass='reset'><Link className='link dropdown' to={'/contact_us'}>Contact us</Link></MenuItem>
                  <MenuItem eventKey={3.3} componentClass='reset'><Link className='link dropdown' to={'/about_us'}>About us</Link></MenuItem>
                  <MenuItem divider />
                  <MenuItem
                    eventKey={3.4}
                    componentClass='reset'
                    onClick={() => firebase.auth().signOut()}>
                    <Link className='link dropdown'>
                    Sign out</Link></MenuItem>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>

          </Navbar>
        </div>

      )
    }

  }
