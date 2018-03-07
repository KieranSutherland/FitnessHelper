import React, { Component } from 'react';
import { ProgressBar, FormControl, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { firebase } from '../firebase';
import NaviBar from './NaviBar';
import './Diet.css';

export default class Diet extends Component {
  constructor(props){
    super(props);

    this.state = {
      caloriesGoal: '',
      progress: 0,
      addCaloriesTextField: ''
    }

    }

    componentDidMount() {

      firebase.auth().onAuthStateChanged(user => {

          if(user) {
            firebase.database().ref('/users/' + user.uid).once('value').then(snapshot => {
              // Calculate age
              var today = new Date();
              var birthDate = new Date(snapshot.val() && snapshot.val().dob);
              var calculatedAge = today.getFullYear() - birthDate.getFullYear();
              var m = today.getMonth() - birthDate.getMonth();
              if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
              {calculatedAge--;}

              this.setState({ // Set values to current user's data
                fitnessChoice: (snapshot.val() && snapshot.val().fitnessChoice),
                gender: (snapshot.val() && snapshot.val().gender),
                age: calculatedAge,
                height: (snapshot.val() && snapshot.val().height),
                weight: (snapshot.val() && snapshot.val().weight),
                calories: (snapshot.val() && snapshot.val().calories)
              });
              //Set button of fitnessChoice to the correct one
              this.state.fitnessChoice === 'gain' ? this.setState({gainColor: '#00C853'}) : this.setState({loseColor: '#00C853'});

              //Calculate calories needed
              var bmr = 10 * parseInt(snapshot.val().weight , 10 )
               + 6.25 * parseInt(snapshot.val().height , 10 )
                - 5 * parseInt(calculatedAge , 10 )
                 + ((snapshot.val().gender === 'male') ? 5 : -161);

              //Add or substract calories needed to gain or lose 1lb per week based on fitnessChoice
              var calGoal = Math.round((snapshot.val().fitnessChoice === 'gain') ? ((bmr * 1.55) + 500) : ((bmr * 1.55) - 500)); //1.55 for 3-5 days exercise per week
              this.setState({caloriesGoal: calGoal})

              //Update progress bar with calories eaten for that day
              var newProgress = Math.round((parseInt(snapshot.val().calories , 10 ) / calGoal) * 100)
              this.setState({progress: newProgress});

              //Make sure progress can't go past 100%
              if(newProgress > 100) { //Local variable because progress state won't be updated until componentDidMount function is completed
                this.setState({progress: 100})
              }
            });

            }
            else {
              browserHistory.push('/login'); //User isn't allowed to access this page without being logged in first
            }

        });

      }

      addCalories() {
        //If text field is empty, no need to change states
        if(this.state.addCaloriesTextField != '') {
          //Update states
          //Need to delcare newCal state so that progressBar and database update instantly instead of next button click (same for newProgress)
          var newCal = (parseInt(this.state.calories , 10 )) + (parseInt(this.state.addCaloriesTextField , 10 ))
          var newProgress = Math.round((parseInt(newCal , 10 ) / this.state.caloriesGoal) * 100)
          this.setState({calories: newCal});
          this.setState({progress: newProgress});
          //Make sure progress can't go past 100%
          if(newProgress > 100) {
            this.setState({progress: 100})
          }
          //Update database
          if(firebase.auth()) {
            firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
              calories: newCal
            });
          }

        }

      }

    render() {
      return (
        <div>
          <NaviBar />
          <div className='diet-container'>

          <h1>Diet</h1>
          <hr />
          <h2>Progress for today's calorie intake:</h2>
          <ul className='caloriesAndGoal'>
          <li>Calories: {this.state.calories}</li>
          <li>Goal: {this.state.caloriesGoal}</li>
        </ul>
          <ProgressBar className='progressBar' now={this.state.progress} label={`${this.state.progress}%`} />
          <hr />

          <h3>Add calories to your total for today</h3>
          <div className='inputLine addCalories'>
            <FormControl
              type="text"
              onChange={e => this.setState({addCaloriesTextField: e.target.value})}
            />
            <Button
              className='submitButton add'
              onClick={() => this.addCalories()}
              >
              Add
            </Button>
          </div>



          </div>
        </div>
      )
    }

  }
