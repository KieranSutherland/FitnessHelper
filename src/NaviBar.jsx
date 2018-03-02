import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
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
                <a className='header' href="#home">FitnessHelper</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>

            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} href="#">
                  Diet
                </NavItem>
                <NavItem eventKey={2} href="#">
                  Exercise
                </NavItem>

                <NavDropdown eventKey={3} title="Profile" id="nav-dropdown">
                  <MenuItem eventKey={3.1}>Account</MenuItem>
                  <MenuItem eventKey={3.2}>Contact us</MenuItem>
                  <MenuItem eventKey={3.3}>About us</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.4}>Sign out</MenuItem>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>

          </Navbar>
        </div>

      )
    }

  }
