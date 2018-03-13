import React, { Component } from 'react';
import { ProgressBar, FormControl, Button, Glyphicon } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { firebase } from '../firebase';
import NaviBar from './NaviBar';
import './css/Diet.css';

export default class Diet extends Component {
  constructor(props){
    super(props);

    this.state = {
      caloriesGoal: '',
      progress: 0,
      foodTextField: '',
      caloriesTextField: '',
      foodLog: []
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

        this.updateFoodLog();

      }

      updateFoodLog() {
        if(firebase.auth().currentUser) {
          //Update food log
          firebase.database().ref('users/' + firebase.auth().currentUser.uid).child('foodLog').on('value', snapshot => {
            let foodArray = [];
            snapshot.forEach(snap => {
              const { calories, food } = snap.val();
              foodArray.push({ calories, food });
            })
            this.setState({foodLog: foodArray})
          });
        }
      }

      addFood() {
        //If text fields are empty, no need to change states
        if(this.state.caloriesTextField !== '' && this.state.foodTextField !== '') {
          //Update states
          //Need to delcare newCal state so that progressBar and database update instantly instead of next button click (same for newProgress)
          var newCal = (parseInt(this.state.calories , 10 )) + (parseInt(this.state.caloriesTextField , 10 ))
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
            firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/foodLog').push({
              food: this.state.foodTextField,
              calories: this.state.caloriesTextField
            });
          }

        }

      }

      removeClicked(index) {
        const dataLink = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/foodLog')

        let i = 0
        dataLink.once('value', snapshot => {
          var removedCals = 0;
          snapshot.forEach( snap => {
            if(i === index) {
              removedCals = snap.val().calories
              //If index matches the index of the log chosen to be removed, remove the child node
              snap.ref.remove();
            }
            i++;
          })
          // Update new calories and progressBar values
          var newCal = (parseInt(this.state.calories , 10 )) - removedCals
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

        })
      }

    render() {
      return (
        <div>
          <NaviBar />
          <div className='content-container'>

          <h1>Diet</h1>
          <hr />
          <h2>Progress for today's calorie intake</h2>
          <div className='caloriesAndGoal'>
            <ul>
              <li>Calories: {this.state.calories}</li>
              <li>Goal: {this.state.caloriesGoal}</li>
            </ul>
          </div>

          <ProgressBar className='progressBar' now={this.state.progress} label={`${this.state.progress}%`} />
          <hr />

          <h2>Add eaten food</h2>
          <div className='inputLine addCalories'>
            <FormControl
              type="text"
              placeholder='Food'
              style={{margin: '0px 15px 0px 0px'}}
              onChange={e => this.setState({foodTextField: e.target.value})}
            />
            <FormControl
              type="text"
              placeholder='Calories'
              onKeyPress={e => {if(e.key === 'Enter') {this.addFood()}}} //Login if Enter key pressed
              onChange={e => this.setState({caloriesTextField: e.target.value})}
            />
            <Button
              className='submitButton add'
              onClick={() => this.addFood()}
              >
              Add
            </Button>
          </div>
          <hr />

          <div className='foodLogContainer'>
            <h2>Food Log</h2>
            <div style={{padding: '20px 0 0 20px'}}>
              {
                this.state.foodLog.map((array, index) => {
                  return (
                    <div key={index} className='foodLog'><strong>{array.food}</strong> - {array.calories} <Glyphicon onClick={() =>this.removeClicked(index)} className='removeGlyph' glyph="remove" /></div>
                  )
                })
              }
            </div>
          </div>

          </div>
        </div>
      )
    }

  }
