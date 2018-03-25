import React, { Component } from 'react';
import { Button, FormControl } from 'react-bootstrap';
import { firebase } from '../firebase';

export default class ExerciseCalculators extends Component {
  constructor(){
    super();
    this.state = {
      modalMessage: '',
      weightLifted: '',
      reps: '',
      oneRepMaxTextField: '',
      bmiTextField: ''
    }

    }

    componentDidMount() {



      firebase.auth().onAuthStateChanged(user => {

          if(user) {
            firebase.database().ref('/users/' + user.uid).once('value').then(snapshot => {

              let height = (snapshot.val() && snapshot.val().height) / 100; // divided by 100 to convert from cm to metres
              let weight = (snapshot.val() && snapshot.val().weight);

              this.setState({ // Set value for BMI
                bmiTextField: Math.round((weight / (height * height)) * 10) / 10 //Round to one decimal place
              });
            });
          }

        });

      }

    oneRepMax() {
      this.setState({oneRepMaxTextField: Math.round(this.state.weightLifted * ( 1 + (this.state.reps / 30)))})
    }


    render() {

      return (

          <main>

          <h2>Calculators</h2>

          <h4>One Rep Max</h4>
          <p>
            Enter the weight you can lift along with however many perfect form reps you can do within one set
          </p>
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
          <div className='inputLine small'>
            <FormControl
              style={{width: '250px'}}
              disabled
              type="text"
              placeholder='Result'
              value={this.state.oneRepMaxTextField}
            />
          </div>

          <hr align='left' width='250px'/>

          <h4>Body Mass Index (BMI)</h4>
          <p>
            Using your account information, this caluclation is done automatically.
          </p>
          <div className='inputLine small'>
            <FormControl
              style={{width: '250px'}}
              disabled
              type="text"
              placeholder='Result'
              value={this.state.bmiTextField}
            />
          </div>

        </main>

      )
    }

  }
