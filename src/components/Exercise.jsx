import React, { Component } from 'react';
import { } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { firebase } from '../firebase';
import NaviBar from './NaviBar';
import './Exercise.css';

export default class Exercise extends Component {
  constructor(){
    super();
    this.state = {
      fitnessChoice: ''
    }

    }

    componentDidMount() {

      firebase.auth().onAuthStateChanged(user => {

        if(user) {
          firebase.database().ref('/users/' + user.uid).once('value').then(snapshot => {
            this.setState({ // Set values to current user's data
              fitnessChoice: (snapshot.val() && snapshot.val().fitnessChoice),
            });
          });
          }
          else {
            browserHistory.push('/login'); //User isn't allowed to access this page without being logged in first
          }

      });
    }

    render() {
      return (
        <div>
          <NaviBar />
          Exercise
        </div>
      )
    }

  }
