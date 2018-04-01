import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { firebase } from '../firebase';
import NaviBar from './NaviBar';
import Loading from './Loading';
import ExerciseGain from './ExerciseGain';
import ExerciseLose from './ExerciseLose';


export default class Exercise extends Component {
  constructor(){
    super();
    this.state = {
      isLoading: true
    }

    }

    componentDidMount() {

      firebase.auth().onAuthStateChanged(user => {

        if(user) {
          firebase.database().ref('/users/' + user.uid).once('value').then(snapshot => {
            this.setState({
              fitnessChoice: snapshot.val() && snapshot.val().fitnessChoice,
              isLoading: false
            })
          });
          }
          else {
            browserHistory.push('/login'); // User isn't allowed to access this page without being logged in first
          }

      });
    }

    render() {

      if(this.state.isLoading === true)  {
        return ( <Loading /> );
      }
      else if(this.state.fitnessChoice === 'gain') {
        return (
          <main>
            <NaviBar />
            <ExerciseGain />
          </main>
          )
      }
      else {
        return (
          <main>
            <NaviBar />
            <ExerciseLose />
          </main>
        )
      }

    }

  }
