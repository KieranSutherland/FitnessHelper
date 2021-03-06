import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import '../css/Exercise.css';
import ExerciseCalculators from './ExerciseCalculators';
import DeadliftWorkout from './workouts/DeadliftWorkout';
import BenchWorkout from './workouts/BenchWorkout';
import GainTutorials from './GainTutorials';

export default class ExerciseGain extends Component {
  constructor(){
    super();
    this.state = {
      modalMessage: ''
    }

    }

    printDocument(choice) {
      let input;
      if(choice === '1') {
        input = document.getElementById('week1Div');
      }
      else {
        input = document.getElementById('week2Div');
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

            <Tab eventKey={1} title="Week 1">
              <div id="week1Div" >
                <h3>Monday</h3>
                <DeadliftWorkout />

                <h3>Wednesday</h3>
                <BenchWorkout />

                <h3>Friday</h3>
                <DeadliftWorkout />
              </div>
              <h4><a onClick={() => this.printDocument('1')}>Download Week as PDF</a></h4>
            </Tab>


            <Tab eventKey={2} title="Week 2">
              <div id="week2Div" >
                <h3>Monday</h3>
                <BenchWorkout />

                <h3>Wednesday</h3>
                <DeadliftWorkout />

                <h3>Friday</h3>
                <BenchWorkout />
              </div>
              <h4><a onClick={() => this.printDocument('2')}>Download Week as PDF</a></h4>
            </Tab>

          </Tabs>

          <hr />

          <GainTutorials />

          <hr />

          <ExerciseCalculators />

          <hr />

          <h3>Advice</h3>
          <p>
            The strategy with every exercise, is to get a perfect rep every time. It matters a lot more that you complete a perfect rep, than it does getting in every
            rep of the set. 3 perfect form reps will give better muscle growth than 6 bad form reps, and will also give less chance of injury. If you can't get
            every rep out, drop down to a lower weight. Don't let yourself ego lift by going up weight when your body can't handle it, you will make it more
            likely to injure yourself, and you'll also plateau faster. There are no set weights for you to be using during your workout, this is for you to
            decide. Experiment with different weights, but don't make it too easy, push yourself. No pain, no gain.
          </p>
          <p>
            If you feel like you aren't getting enough of a workout in after you've finished your main exercises, feel free to add accessory lifts at the end.
            These are any exercise that will assist the main exercises (squat, bench, deadlift, overhead press). Exercises could include, for example, dumbbell
            bench press, leg press, or lat pulldowns.
          </p>
          <p>
            The two weeks can be repeated infinitely. Once you have finished week 2, restart back to week 1. As the weeks go on, the heavier weight you will be able to lift.
          </p>

      </main>
      )
    }

  }
