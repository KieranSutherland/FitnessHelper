import React, { Component } from 'react';
import { } from 'react-bootstrap';
import { firebaseApp } from '../firebase';
import NaviBar from './NaviBar';
import './AboutUs.css';

export default class AboutUs extends Component {
  constructor(){
    super();
    this.state = {

    }

    }

    render() {
      return (
        <div>
          <NaviBar />
          About us
        </div>
      )
    }

  }
