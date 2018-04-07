import React, { Component } from 'react';
import { firebase } from '../../firebase';
import Loading from '../Loading';
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
            this.props.history.push('/login'); // User isn't allowed to access this page without being logged in first
          }
      });

    }

    render() {

      if(this.state.isLoading === true)  {
        return <Loading />
      }
      else if(this.state.fitnessChoice === 'gain') {
        return <ExerciseGain />
      }
      else {
        return <ExerciseLose />
      }
    }

  }
