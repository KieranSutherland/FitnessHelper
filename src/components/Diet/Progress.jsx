import React, { Component } from 'react';
import { ProgressBar, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../css/Diet.css';

export default class Progress extends Component {
  constructor(){
    super();

    this.state = {
      progress: 0,
    }

    }

    render() {

      return (
        <section>

          <h1>Diet</h1>
          <hr />
          <h2>Progress for today's calorie intake</h2>
          <div className='caloriesAndGoal'>
            <ul>
              <li>Calories: {this.props.calories}</li>
              <li>Goal: {this.props.caloriesGoal}</li>
            </ul>
          </div>

          <ProgressBar className='progressBar' now={this.props.progress} label={`${this.props.progress}%`} />


            <NavLink style={{display: 'block', height: '100%', width: '100%'}} to={'/calorie_history'}>
              <Button className='submitButton calHistoryBtn'>Go to calorie intake history</Button>
            </NavLink>


        </section>
      )

    }

  }
