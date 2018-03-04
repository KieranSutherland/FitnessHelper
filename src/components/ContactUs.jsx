import React, { Component } from 'react';
import { } from 'react-bootstrap';
import { firebaseApp } from '../firebase';
import NaviBar from './NaviBar';
import './ContactUs.css';

export default class ContactUs extends Component {
  constructor(){
    super();
    this.state = {

    }

    }

    render() {
      return (
        <div>
          <NaviBar />
          Contact us
        </div>
      )
    }

  }
