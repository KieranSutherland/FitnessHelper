import React, { Component } from 'react';
import { Button, ToggleButtonGroup, ToggleButton, ButtonToolbar, FormControl, Alert} from 'react-bootstrap';
import { Link, browserHistory } from 'react-router';
import { firebase } from '../firebase';
import NaviBar from './NaviBar';
import './css/RegisterLogin.css';

export default class Register extends Component {
  constructor(){
    super();
    this.state = {
      email : '',
      password : '',
      fitnessChoice : '',
      gender: '',
      dob: '',
      height: '',
      weight : '',
      gainColor: 'white',
      loseColor: 'white',
      alertStyle : 'hidden',
      error: {
        message: ''
      }
    }

    }

    gainClicked(e) {
        this.setState({fitnessChoice : e.target.value});
        if(this.state.gainColor === 'white') {
          this.setState({gainColor: '#00C853'});
          if(this.state.loseColor === '#00C853') //If other button is already selected, deselect it
            this.setState({loseColor: 'white'})
        }
        else {
            this.setState({gainColor: 'white', fitnessChoice: ''}); //If same button is selected, deselect it & reset fitnessChoice
        }
      }

    loseClicked(e) {
        this.setState({fitnessChoice : e.target.value});
        if(this.state.loseColor === 'white') {
          this.setState({loseColor: '#00C853'});
          if(this.state.gainColor === '#00C853')
            this.setState({gainColor: 'white'})
        }
        else {
            this.setState({loseColor: 'white', fitnessChoice: ''});
        }
    }

    submitClicked() { // Check all information has been entered
      if(this.state.fitnessChoice === '' || this.state.dob === '' || this.state.height === '' || this.state.weight === '' || this.state.gender === '') {
        this.setState({error: {message: 'Please enter all information'} })
        this.setState({alertStyle: 'visible'});
      }
      else { // Else continue with authentication of email and password
        let { email, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => {
          this.setState({error});
          this.setState({alertStyle: 'visible'});
        });

        firebase.auth().onAuthStateChanged(user => {
          if(user) { // Only activates if user has registered and been created
            firebase.database().ref('users/' + user.uid).set({
              email: this.state.email,
              fitnessChoice: this.state.fitnessChoice,
              gender: this.state.gender,
              dob: this.state.dob,
              height: this.state.height,
              weight: this.state.weight,
              calories: 0
            });
            user.sendEmailVerification().then( () => {
              // Email sent.
            }).catch(error => {
              console.log('Error sending email verification')
            });
            // Because user has logged in, re-direct to home page
            browserHistory.push('/home');
          }
        });
      }


    }

    render() {
      return (

        <div>
          <NaviBar />
        <div className='container'>

          <h1>Register</h1>
          <hr />

          <div className='inputLine'>
            <h4>Email</h4>
            <FormControl
              type="text"
              placeholder="john@example.com"
              onChange={ e => this.setState({ email : e.target.value }) }
            />
          </div>

          <div className='inputLine'>
            <h4>Password</h4>
            <FormControl
              type="password"
              placeholder="Password (6 or more letters & numbers)"
              onChange={ e => this.setState({ password : e.target.value }) }
            />
          </div>

          <div className='inputLine'>
            <h4>Date of Birth</h4>
            <FormControl
              type="date"
              placeholder="dd/mm/yyyy"
              onChange={ e => this.setState({ dob : e.target.value }) }
            />
          </div>

          <div className='inputLine'>
            <h4>Gender</h4>
              <ToggleButtonGroup className='radio' type="radio" name="options">
                <ToggleButton value={'male'} onChange={e => this.setState({ gender : e.target.value })}>Male</ToggleButton>
                <ToggleButton value={'female'} onChange={e => this.setState({ gender : e.target.value })}>Female</ToggleButton>
              </ToggleButtonGroup>
          </div>

          <div className='inputLine'>
            <h4>Height</h4>
            <FormControl
              type="text"
              placeholder="Height (cm)"
              onChange={ e => this.setState({ height : e.target.value }) }
            />
          </div>

          <div className='inputLine'>
            <h4>Weight</h4>
            <FormControl
              type="text"
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
                onClick={this.gainClicked.bind(this)}
                style={{backgroundColor:this.state.gainColor}}>
                Gain muscle mass
              </Button>
              <Button
                className='buttonChoice'
                value='lose'
                onClick={this.loseClicked.bind(this)}
                style={{backgroundColor:this.state.loseColor}}>
                Lose weight & gain tone
              </Button>
            </ButtonToolbar>
          </div>

          <div className='inputLine'>
            <br />
            <Button
              className='submitButton'
              onClick={() => this.submitClicked()}
              >
              Register
            </Button>
          </div>
          <div><Link to={'/login'}>Already a member? Log in here</Link></div>

          <br /><br />

          <div>
            <Alert className='alert' bsStyle="warning" style={{visibility:this.state.alertStyle}}>
              <strong>Error!</strong> {this.state.error.message}
            </Alert>
          </div>

        </div>

      </div>
      )
    }
  }
