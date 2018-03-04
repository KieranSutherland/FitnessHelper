import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { firebaseApp } from '../firebase';
import NaviBar from './NaviBar';
import './Diet.css';

export default class Diet extends Component {
  constructor(){
    super();
    this.state = {
      weight: 150,
      height: 186,
      age: 21,
      progress: 60
    }

    }

    render() {
      return (
        <div>
          <NaviBar />
          <div className='diet-container'>

          <h1>Diet</h1>
          <h4>Progress for today's calorie intake</h4>
          <ProgressBar style={{width: 400}} now={this.state.progress} label={`${this.state.progress}%`} />

          </div>
        </div>
      )
    }

  }
