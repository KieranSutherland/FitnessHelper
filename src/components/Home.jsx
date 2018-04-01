import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import './css/Home.css';

export default class Home extends Component {
  constructor(){
    super();
    this.state = {

    }
    }


render() {
  return(

    <main>

      <Jumbotron className='jumbo'>
        <h1>Welcome to <a>FitnessHelper</a></h1>
        <p>
          FitnessHelper makes it easy to find the correct diet and exercise plan for your fitness goal.
        </p>
      </Jumbotron>

    </main>



  )
}
  }
