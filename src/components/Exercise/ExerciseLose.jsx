import React, { Component } from 'react';
import { Tabs, Tab, Table } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import '../css/Exercise.css';
import ExerciseCalculators from './ExerciseCalculators';
import Toning1 from './workouts/Toning1';
import Core1 from './workouts/Core1';
import Lower1 from './workouts/Lower1';
import Toning2 from './workouts/Toning2';
import Core2 from './workouts/Core2';
import Lower2 from './workouts/Lower2';
import LoseTutorials from './LoseTutorials';

export default class ExerciseLose extends Component {
  constructor(){
    super();
    this.state = {
    }

    }

    printDocument(choice) {
      let input;
      if(choice === '1') {
        input = document.getElementById('week1To4Div');
      }
      else {
        input = document.getElementById('week5To8Div');
      }
      html2canvas(input)
      .then(canvas => {
          document.body.appendChild(canvas);
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          pdf.addImage(imgData, 'JPEG', 0, 2); //Change for paddding
          pdf.save("workout.pdf");
        });
    }

    render() {

      return (
        <main className='content-container'>

          <h1>Exercise</h1>
          <hr />
          <h2>Your Workout</h2>
          <Tabs defaultActiveKey={1} animation={false} id="uncontrolled-tab-example">

            <Tab eventKey={1} title="Week 1-4">
              <div id="week1To4Div">
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
              </div>
              <h4><a onClick={() => this.printDocument('1')}>Download Week as PDF</a></h4>
            </Tab>

            <Tab eventKey={2} title="Week 5-8">
              <div id="week5To8Div">
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
              </div>
              <h4><a onClick={() => this.printDocument('5')}>Download Week as PDF</a></h4>
            </Tab>

          </Tabs>

          <hr />

          <LoseTutorials />

          <hr />

          <ExerciseCalculators />

          <hr />

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

      </main>
      )
    }

  }
