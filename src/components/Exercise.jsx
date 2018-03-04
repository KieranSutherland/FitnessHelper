import React, { Component } from 'react';
import { } from 'react-bootstrap';
import { firebaseApp } from '../firebase';
import NaviBar from './NaviBar';
import './Exercise.css';

export default class Exercise extends Component {
  constructor(){
    super();
    this.state = {

    }

    }

    render() {
      return (
        <div>
          <NaviBar />
          Exercise
        </div>
      )
    }

  }
