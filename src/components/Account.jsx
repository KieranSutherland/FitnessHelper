import React, { Component } from 'react';
import { } from 'react-bootstrap';
import { firebaseApp } from '../firebase';
import NaviBar from './NaviBar';
import './Account.css';

export default class Account extends Component {
  constructor(){
    super();
    this.state = {

    }

    }

    render() {
      return (
        <div>
          <NaviBar />
          Account
        </div>
      )
    }

  }
