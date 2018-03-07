import React, { Component } from 'react';
import { firebase } from '../firebase';
import { Link } from 'react-router';
import { Button, Jumbotron } from 'react-bootstrap';
import NaviBar from './NaviBar';
import './Home.css';

export default class Home extends Component {
  constructor(){
    super();
    this.state = {

    }
    }


render() {
  return(

    <div>
      <NaviBar />
      <Jumbotron className='jumbo'>
        <h1>Welcome to <a>Fitness</a><a>Helper</a></h1>
        <p>
          FitnessHelper makes it easy to find the correct diet and exercise plan for your fitness goal.
        </p>
      </Jumbotron>

    </div>



  )
}
  }
