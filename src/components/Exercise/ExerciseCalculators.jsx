import React, { Component } from 'react';
import { Button, FormControl } from 'react-bootstrap';
import { firebase } from '../../firebase';

export default class ExerciseCalculators extends Component {
  constructor(){
    super();
    this.state = {
      weightLifted: '',
      reps: '',
      oneRepMaxTextField: '',
      bmiTextField: '',
      bmiResult: '',
      bmiResultColor: 'Black'
    }

    }

    componentDidMount() {

      firebase.auth().onAuthStateChanged(user => {

          if(user) {
            firebase.database().ref('/users/' + user.uid).once('value').then(snapshot => {

              let height = (snapshot.val() && snapshot.val().height) / 100; // divided by 100 to convert from cm to metres
              let weight = (snapshot.val() && snapshot.val().weight);
              let bmi = Math.round((weight / (height * height)) * 10) / 10; //Round to one decimal place
              let bmiResult = 'Error' //Set for default
              let bmiResultColor = 'Black'

              //Calculate user's health based on their bmi result
              if(bmi < 18) {
                bmiResult = 'underweight'
                bmiResultColor = '#2196F3'
              }
              else if(bmi >= 18 && bmi < 25) {
                bmiResult = 'healthy'
                bmiResultColor = '#00C853'
              }
              else if(bmi >= 25 && bmi < 30) {
                bmiResult = 'overweight'
                bmiResultColor = '#FFD600'
              }
              else if(bmi >= 30 && bmi < 40) {
                bmiResult = 'obese'
                bmiResultColor = '#FF9800'
              }
              else if(bmi >= 40) {
                bmiResult = 'extremely obese'
                bmiResultColor = '#E53935'
              }

              this.setState({ // Set value for BMI
                bmiTextField: bmi,
                bmiResult: bmiResult,
                bmiResultColor: bmiResultColor
              });
            });
          }

        });

      }

    oneRepMax() {
      let textbox1 = Number(this.state.weightLifted)
      let textbox2 = Number(this.state.reps)

      // If both textboxes are integers and not empty
      if(Math.floor(textbox1) === textbox1 && Math.floor(textbox2) === textbox2
          && this.state.weightLifted !== '' && this.state.reps !== '') {
        this.setState({oneRepMaxTextField: 'Result = ' + Math.round(this.state.weightLifted * ( 1 + (this.state.reps / 30)))})
      }
      else {
        this.setState({oneRepMaxTextField: ''})
      }
    }

    render() {

      return (
          <section>

          <h2>Calculators</h2>

          <h4>One Rep Max</h4>
          <span>
            Enter the weight you can lift along with however many perfect form reps you can do within one set
          </span>
          <br /><br />
          <div className='inputLine small'>
            <FormControl
              type="text"
              placeholder='Weight Lifted'
              value={this.state.weightLifted}
              style={{margin: '0px 15px 0px 0px'}}
              onKeyPress={e => {if(e.key === 'Enter') {this.oneRepMax()}}} //Login if Enter key pressed
              onChange={e => this.setState({weightLifted: e.target.value})}
            />
            <FormControl
              type="text"
              placeholder='Reps'
              value={this.state.reps}
              onKeyPress={e => {if(e.key === 'Enter') {this.oneRepMax()}}} //Login if Enter key pressed
              onChange={e => this.setState({reps: e.target.value})}
            />
            <Button
              className='submitButton add'
              onClick={() => this.oneRepMax()}
              >
              Calculate
            </Button>

          </div>
          <span className='exerciseResult'>
              {this.state.oneRepMaxTextField}
          </span>

          <hr align='left' width='250px'/>

          <h4>Body Mass Index (BMI)</h4>
          <span>
            Using your account information, this caluclation is done automatically.
          </span>
          <br /><br />
          <span className='exerciseResult'>
              BMI = {this.state.bmiTextField}
          </span>
          <br />
          <span className='exerciseResult' style={{color: this.state.bmiResultColor}}>
              You are {this.state.bmiResult}
          </span>

        </section>
      )
    }

  }
