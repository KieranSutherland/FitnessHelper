import React, { Component } from 'react';
import { firebase } from '../../firebase';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Loading from '../Loading';
import AddFood from './AddFood';
import Progress from './Progress';
import FoodLog from './FoodLog';
import ResetDay from './ResetDay';
import '../css/Diet.css';

export default class Diet extends Component {
  constructor(){
    super();

    this.state = {
      caloriesGoal: '',
      progress: 0,
      foodLog: [],
      isLoading: true
    }

    }

    componentDidMount() {

      firebase.auth().onAuthStateChanged(user => {

          if(user) {
            firebase.database().ref('/users/' + user.uid).once('value').then(snapshot => {
              // Calculate age
              let today = new Date();
              let birthDate = new Date(snapshot.val() && snapshot.val().dob);
              let calculatedAge = today.getFullYear() - birthDate.getFullYear();
              let m = today.getMonth() - birthDate.getMonth();
              if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
              {calculatedAge--;}

              this.setState({ // Set values to current user's data
                fitnessChoice: (snapshot.val() && snapshot.val().fitnessChoice),
                gender: (snapshot.val() && snapshot.val().gender),
                age: calculatedAge,
                height: (snapshot.val() && snapshot.val().height),
                weight: (snapshot.val() && snapshot.val().weight),
                calories: (snapshot.val() && snapshot.val().calories),
                isLoading: false
              });

              //Calculate calories needed
              let bmr = 10 * parseInt(snapshot.val().weight , 10)
               + 6.25 * parseInt(snapshot.val().height , 10)
                - 5 * parseInt(calculatedAge , 10)
                 + ((snapshot.val().gender === 'male') ? 5 : -161);

              //Re-calculate calories needed to gain or lose 1lb per week based on fitnessChoice
              let calGoal = Math.round((snapshot.val().fitnessChoice === 'gain') ? ((bmr * 1.55) + 500) : ((bmr * 1.55) - 500)); //1.55 for 3-5 days exercise per week
              this.setState({caloriesGoal: calGoal})

              this.updateProgressBar(snapshot.val().calories, calGoal);
              this.updateFoodLog();

            });

            }
            else {
              this.props.history.push('/login'); //User isn't allowed to access this page without being logged in first
            }

        });

      }

      updateProgressBar(calories, calGoal) {

          //Update progress bar with calories eaten for that day
          let newProgress = Math.round((parseInt(calories , 10 ) / calGoal) * 100)
          this.setState({progress: newProgress});

          //Make sure progress can't go past 100%
          //Local variable because progress state won't be updated until componentDidMount function is completed
          if(newProgress > 100) {
            this.setState({progress: 100})
          }
          this.setState({calories: calories})

      }

      updateFoodLog() {
        if(firebase.auth()) {
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


    render() {
      if(this.state.isLoading === true)  {
        return ( <Loading /> );
      }
      else {
      return (
        <main className='content-container'>

          <Progress
            calories={this.state.calories}
            caloriesGoal={this.state.caloriesGoal}
            progress={this.state.progress}
          />

          <hr />

          <NavLink to={'/calorie_history'}>
            <Button className='submitButton calHistoryBtn'>Calorie History</Button>
          </NavLink>

          <hr />

          <AddFood
            calories={this.state.calories}
            updateProgressBar={this.updateProgressBar.bind(this)}
            caloriesGoal={this.state.caloriesGoal}
            fitnessChoice={this.state.fitnessChoice}
          />

          <hr />

          <FoodLog
            foodLog={this.state.foodLog}
            calories={this.state.calories}
            updateProgressBar={this.updateProgressBar.bind(this)}
            caloriesGoal={this.state.caloriesGoal}
          />

          <hr /><br />

          <ResetDay
            calories={this.state.calories}
            setState={this.setState.bind(this)}
          />

        </main>
      )
    }
    }

  }
