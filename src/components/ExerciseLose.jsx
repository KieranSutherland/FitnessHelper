import React, { Component } from 'react';
import { Tabs, Tab, Table } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { firebase } from '../firebase';
import NaviBar from './NaviBar';
import './css/Exercise.css';
import Toning1 from './workouts/Toning1';
import Core1 from './workouts/Core1';
import Lower1 from './workouts/Lower1';
import Toning2 from './workouts/Toning2';
import Core2 from './workouts/Core2';
import Lower2 from './workouts/Lower2';

export default class ExerciseLose extends Component {
  constructor(){
    super();
    this.state = {
    }

    }

    componentDidMount() {

      firebase.auth().onAuthStateChanged(user => {

        if(user) {
          firebase.database().ref('/users/' + user.uid).once('value').then(snapshot => {
            if((snapshot.val() && snapshot.val().fitnessChoice) === 'gain') {
              browserHistory.push('/exercise_gain'); // Push user to correct page if they have a different fitnessChoice
            }
          });
          }
          else {
            browserHistory.push('/login'); // User isn't allowed to access this page without being logged in first
          }

      });
    }

    render() {

      return (
        <div>
          <NaviBar />
          <div className='diet-container'>

          <h1>Exercise</h1>
          <hr />
          <h2>Your Workout</h2>
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">

            <Tab eventKey={1} title="Week 1-4">
              <h3>Monday</h3>
              <Toning1 />

              <h3>Wednesday</h3>
              <Core1 />

              <h3>Friday</h3>
              <Lower1 />

              <h3>Saturday</h3>
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>Exercise</th>
                    <th>Sets</th>
                    <th>Reps</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Fast walk</td>
                    <td>1</td>
                    <td>30 mins</td>
                  </tr>
                </tbody>
              </Table>
            </Tab>

            <Tab eventKey={2} title="Week 5-8">
              <h3>Monday</h3>
              <Toning2 />

              <h3>Wednesday</h3>
              <Core2 />

              <h3>Thursday</h3>
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>Exercise</th>
                    <th>Sets</th>
                    <th>Reps</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Treadmill/Rowing Machine</td>
                    <td>1</td>
                    <td>20 mins</td>
                  </tr>
                </tbody>
              </Table>

              <h3>Friday</h3>
              <Lower2 />

              <h3>Saturday</h3>
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>Exercise</th>
                    <th>Sets</th>
                    <th>Reps</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Bike machine</td>
                    <td>1</td>
                    <td>20 mins</td>
                  </tr>
                </tbody>
              </Table>
            </Tab>

          </Tabs>
          <h3>Tutorials</h3>
          <div className='tutorials-container'>
            <p><a>Bicep curl</a></p>
            <p><a>Tricep pulldown</a></p>
            <p><a>Lateral pulldown</a></p>
            <p><a>Front raise with dumbbell</a></p>
            <p><a>Plank</a></p>
            <p><a>Ab crunch</a></p>
            <p><a>Bicycle crunch</a></p>
            <p><a>Lunge with dumbbell</a></p>
            <p><a>Squat</a></p>
            <p><a>Leg curl</a></p>
            <p><a>Incline dumbbell press</a></p>
            <p><a>Tricep kickback with bench</a></p>
            <p><a>Lateral raise with dumbbell</a></p>
            <p><a>Side plank</a></p>
            <p><a>Straight leg raise with bench</a></p>
            <p><a>Squat with dumbbell</a></p>
            <p><a>Seated calf raise with dumbbell</a></p>
            <p><a>Side lunge with dumbbell</a></p>
          </div>

          <h3>Advice</h3>
          <p>
            Before every day, it's advised to warm up on a cardiovascular machine of your choice for 5 minutes. This is important because it will get the blood flowing and
            will make sure your heart and other muscles are ready for the workout to come.
          </p>
          <p>
            The strategy with every exercise, is to get a perfect rep every time. It matters a lot more that you complete a perfect rep, than it does getting in every
            rep of the set. 3 perfect form reps will give better muscle growth than 6 bad form reps, and will also give less chance of injury. If you can't get
            every rep out, drop down to a lower weight. Don't let yourself ego lift by going up weight when your body can't handle it, you will make it more
            likely to injure yourself, and you'll also plateau faster. There are no set weights for you to be using during your workout, this is for you to
            decide. Experiment with different weights, but don't make it too easy, push yourself. No pain, no gain.
          </p>
          <p>
            If you feel like you aren't getting enough of a workout in after you've finished your main exercises, feel free to add additional exercises before you leave.
            This could include, for example, pull ups, shoulder press, or simply extra time on the treadmill.
          </p>

        </div>
        </div>
      )
    }

  }
