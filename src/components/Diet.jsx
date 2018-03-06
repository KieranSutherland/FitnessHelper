import React, { Component } from 'react';
import { ProgressBar, FormControl, Button } from 'react-bootstrap';
import { firebase } from '../firebase';
import NaviBar from './NaviBar';
import './Diet.css';

export default class Diet extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      fitnessChoice: '',
      gender: '',
      weight: '',
      height: '',
      dob: '',
      age: '',
      calories: '',
      caloriesGoal: '',
      progress: '',
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

              /*var today = new Date();
              var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
              var calculatedAge = ((date - (snapshot.val() && snapshot.val().dob)) / 365);*/
              this.setState({ // Set values to current user's data
                email: (snapshot.val() && snapshot.val().email),
                fitnessChoice: (snapshot.val() && snapshot.val().fitnessChoice),
                gender: (snapshot.val() && snapshot.val().gender),
                dob: (snapshot.val() && snapshot.val().dob),
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
              console.log(this.state);

              //Update progress bar with calories eaten for that day
              this.setState({progress: Math.round((parseInt(snapshot.val().calories , 10 ) / calGoal) * 100)});

            });

            }

        });

        //Check if progress bar is at 100%
        if(this.state.progress >= 100) {
          this.setState({progress: 'Congratulations! You have reached your daily calorie goal. 100'})
          console.log('progress', this.state.progress);
        }
      }

      addCalories() {
        //If text field is empty, no need to change states
        if(this.state.addCaloriesTextField != '') {
          //Update states
          this.setState({calories: (parseInt(this.state.calories , 10 )) + (parseInt(this.state.addCaloriesTextField , 10 ))});
          this.updateProgressBar();
          //Update database
          if(firebase.auth()) {
            firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
              calories: this.state.calories,
              email: this.state.email,
              fitnessChoice: this.state.fitnessChoice,
              dob: this.state.dob,
              gender: this.state.gender,
              weight: this.state.weight,
              height: this.state.height,
            });
          }

        }

      }

      updateProgressBar() {
        this.setState({progress: Math.round((parseInt(this.state.calories , 10 ) / this.state.caloriesGoal) * 100)});
        //Update progress
        if(this.state.progress >= 100) {
          this.setState({progress: 'Congratulations! You have reached your daily calorie goal. 100'})
          console.log('progress', this.state.progress);
        }
        console.log('new calories', this.state.calories);
      }

    render() {
      return (
        <div>
          <NaviBar />
          <div className='diet-container'>

          <h1>Diet</h1>
          <hr />
          <h4>Progress for today's calorie intake</h4>
          <ProgressBar className='progressBar' now={this.state.progress} label={`${this.state.progress}%`} />

          <div className='inputLine'>
            <h4>Add calories to your calorie total for today</h4>
            <FormControl
              type="text"
              onChange={e => this.setState({addCaloriesTextField: e.target.value})}
            />
          </div>
          <div className='inputLine'>
            <br />
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
