import React, { Component } from 'react';
import { Jumbotron, Carousel } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { firebase } from '../firebase';
import './css/Home.css';

export default class Home extends Component {
  constructor(){
    super();
    this.state = {
      carouselPosition: 'absolute',
      carouselTop: '-9999px'
    }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
          if(user) {
            //If carousel won't fit on screen, remove it
            if(window.innerWidth >= 970) {
              this.setState({carouselPosition: '', carouselTop: ''})
            }
          }
      })
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

      <div className='content-container'>

        <Carousel className='carousel' style={{position: this.state.carouselPosition, top: this.state.carouselTop}}>
          <Carousel.Item>
            <NavLink to='/diet'><img alt="Diet" src={ require('./pics/diet.jpeg') }/></NavLink>
            <Carousel.Caption>
              <h3>Diet</h3>
              <p>Get your diet in shape before you get yourself in shape.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <NavLink to='/exercise'><img alt="Exercise" src={ require('./pics/exercise.jpeg') }/></NavLink>
            <Carousel.Caption>
              <h3>Exercise</h3>
              <p>Make progress. Not excuses.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

     </div>

    </main>

  )
}
  }
