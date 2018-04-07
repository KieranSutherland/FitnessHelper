import React, { Component } from 'react';
import { Button, ToggleButtonGroup, ToggleButton, ButtonToolbar, FormControl } from 'react-bootstrap';
import { firebase } from '../firebase';
import AlertPopup from './AlertPopup';
import './css/RegisterLogin.css';

export default class InputLines extends Component {
  constructor(){
    super();
    this.state = {
      gainColor: 'white',
      loseColor: 'white',
      alertStyle: 'hidden',
      alertType: 'success',
      alertHeight: '0px',
      alert: {
        message: ''
      }
    }

    }

    componentDidMount() {
      this.setState({
        email: this.props.email,
        fitnessChoice: this.props.fitnessChoice,
        gender: this.props.gender,
        dob: this.props.dob,
        height: this.props.height,
        weight: this.props.weight
      })
      this.props.fitnessChoice === 'gain' ? this.setState({gainColor: '#00C853'}) : this.setState({loseColor: '#00C853'});
    }

    fitnessChoiceClicked(e) {
      if(e.target.value === 'gain') {
        this.setState({
          fitnessChoice: 'gain',
          gainColor: '#00C853',
          loseColor: 'white'});
      }
      else {
        this.setState({
          fitnessChoice: 'lose',
          loseColor: '#00C853',
          gainColor: 'white'});
      }
    }

    submitClicked() {
      //Either way, there will need to be some alert to say if it was a success or fail
      this.setState({alertStyle: 'visible', alertHeight: '52px'});
      let { email, fitnessChoice, gender, dob, height, weight } = this.state;

      if(dob === '') {
        this.setState({alert: {message: 'Please enter your Date of Birth'}, alertType: 'warning' })
      }
      else if(gender === '') {
        this.setState({alert: {message: 'Please enter your gender'}, alertType: 'warning' })
      }
      else if(height === '') {
        this.setState({alert: {message: 'Please enter your height'}, alertType: 'warning' })
      }
      else if(height === '') {
        this.setState({alert: {message: 'Please enter your height'}, alertType: 'warning' })
      }
      else if(weight === '') {
        this.setState({alert: {message: 'Please enter your weight'}, alertType: 'warning' })
      }
      else {

        // If user is logged in (on Account page)
        if(firebase.auth().currentUser) {
          let user = firebase.auth().currentUser
          user.updateEmail(this.state.email).then(() => { //Checks if email is valid
            firebase.database().ref('users/' + user.uid).update({
              email: email,
              fitnessChoice: fitnessChoice,
              gender: gender,
              dob: dob,
              height: height,
              weight: weight,
            });
            this.setState({alert: {message: 'Changes have been saved successfully'}, alertType: 'success'});

            }).catch(error => {
              this.setState({alert: error, alertType: 'warning'});
            })
        }
        // Else user is not logged in (on Register page)
        else {
          firebase.auth().createUserWithEmailAndPassword(email, this.props.password).catch(error => {
            this.setState({alert: error, alertStyle: 'visible'});
          });

          firebase.auth().onAuthStateChanged( user => {
              if(user) { // Only activates if user has registered and been created
                firebase.database().ref('users/' + user.uid).set({
                  email: email,
                  fitnessChoice: fitnessChoice,
                  gender: gender,
                  dob: dob,
                  height: height,
                  weight: weight,
                  calories: 0
                });
                user.sendEmailVerification().then( () => {
                  // Email sent.
                }).catch(error => {
                  console.log('Error sending email verification')
                });
                // Because user has logged in, re-direct to diet page
                this.props.history.push('/diet');
            }
          });
        }

      }

      // Make alert disappear after 4 seconds
      setTimeout(function () {
              this.setState({alertStyle: 'hidden', alertHeight: '0px'});
      }.bind(this), 4000);

    }

    render() {
        return (
          <section>

            <h3>{this.props.header}</h3>

            <div className='inputLine'>
              <h4>Email</h4>
              <FormControl
                type="text"
                value={this.state.email}
                placeholder="john@example.com"
                onChange={ e => this.setState({ email : e.target.value }) }
              />
            </div>

            <div>{this.props.passwordDiv}</div>

            <div className='inputLine'>
              <h4>Date of Birth</h4>
              <FormControl
                type="date"
                value={this.state.dob}
                placeholder="dd/mm/yyyy"
                onChange={ e => this.setState({ dob : e.target.value }) }
              />
            </div>

            <div className='inputLine'>
              <h4>Gender</h4>
                <ToggleButtonGroup className='radio' type="radio" name="options" value={this.state.gender}>
                  <ToggleButton value={'male'} onChange={e => this.setState({ gender : e.target.value })}>Male</ToggleButton>
                  <ToggleButton value={'female'} onChange={e => this.setState({ gender : e.target.value })}>Female</ToggleButton>
                </ToggleButtonGroup>
            </div>

            <div className='inputLine'>
              <h4>Height (cm)</h4>
              <FormControl
                type="text"
                value={this.state.height}
                placeholder="Height (cm)"
                onChange={ e => this.setState({ height : e.target.value }) }
              />
            </div>

            <div className='inputLine'>
              <h4>Weight (kg)</h4>
              <FormControl
                type="text"
                value={this.state.weight}
                placeholder="Weight (kg)"
                onChange={ e => this.setState({ weight : e.target.value }) }
              />
            </div>

            <div className='inputLine'>
              <h4>Choose Your Fitness Goal</h4>
              <ButtonToolbar className='btnToolbar'>
                <Button
                  className='buttonChoice'
                  value='gain'
                  onClick={this.fitnessChoiceClicked.bind(this)}
                  style={{backgroundColor:this.state.gainColor}}>
                  Gain muscle mass
                </Button>
                <Button
                  className='buttonChoice'
                  value='lose'
                  onClick={this.fitnessChoiceClicked.bind(this)}
                  style={{backgroundColor:this.state.loseColor}}>
                  Lose weight & gain tone
                </Button>
              </ButtonToolbar>
            </div>

            <div className='inputLine'>
              <br />
              <Button
                className='submitButton'
                onClick={this.submitClicked.bind(this)}
                >
                {this.props.submitButtonName}
              </Button>
            </div>

            <div>{this.props.footer}</div>

            <AlertPopup
              height={this.state.alertHeight}
              alertType={this.state.alertType}
              alertStyle={this.state.alertStyle}
              alertMessage={this.state.alert.message}
            />

        </section>
        )
      }

  }
