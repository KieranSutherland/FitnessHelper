import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { firebase } from '../firebase';
import NaviBar from './NaviBar';
import './Diet.css';

export default class Diet extends Component {
  constructor(props){
    super(props);

    this.state = {
      fitnessChoice: '',
      gender: '',
      weight: '',
      height: '',
      age: '',
      calories: '',
      progress: 0
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
                fitnessChoice: (snapshot.val() && snapshot.val().fitnessChoice),
                gender: (snapshot.val() && snapshot.val().gender),
                age: calculatedAge,
                height: (snapshot.val() && snapshot.val().height),
                weight: (snapshot.val() && snapshot.val().weight),
                calories: (snapshot.val() && snapshot.val().calories)
              });
              console.log(this.state);
              this.state.fitnessChoice === 'gain' ? this.setState({gainColor: '#00C853'}) : this.setState({loseColor: '#00C853'});
            });
            }

        });
      }

    render() {
      return (
        <div>
          <NaviBar />
          <div className='diet-container'>

          <h1>Diet</h1>
          <h4>Progress for today's calorie intake</h4>
          <ProgressBar style={{width: 400}} now={this.state.progress} label={`${this.state.progress}%`} />

          </div>
        </div>
      )
    }

  }
