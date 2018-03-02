import React, { Component } from 'react';
import { Button, ButtonToolbar, FormControl, Alert} from 'react-bootstrap';
import './Register.css';

export default class Register extends Component {
  constructor(){
    super();
    this.state = {
      username : '',
      password : '',
      email : '',
      fitnessChoice : '',
      weight : null,
      gainColor: 'white',
      loseColor: 'white',
      alertStyle : 'hidden'
    }

    }

    usernameChanged(e) {
      this.setState({ username : e.target.value });
    }

    passwordChanged(e) {
      this.setState({ password : e.target.value });
    }

    emailChanged(e) {
      this.setState({ email : e.target.value });
    }

    weightChanged(e) {
      this.setState({ weight : e.target.value });
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

    submitClicked() {
      console.log(this.state);
      if(this.state.username.length < 1 || this.state.username.length > 50) {
        this.setState({alertStyle: 'visible'})
      }
      else if(this.state.password.length < 4 || this.state.password.length > 20) {
        this.setState({alertStyle: 'visible'})
      }
      else if(this.state.email.indexOf("@") === -1 || this.state.email.indexOf(".") === -1) {
        this.setState({alertStyle: 'visible'})
      }
    }

    render() {
      return (

        <div className='container'>

          <h1>Sign up</h1>
          <br />



          <div className='inputLine'>
            <h4>Enter Username</h4>
            <FormControl
              type="text"
              placeholder="Username"
              onChange={ this.usernameChanged.bind(this) }
            />
          </div>

          <div className='inputLine'>
            <h4>Enter Password</h4>
            <FormControl
              type="password"
              placeholder="Password (between 4-20 letters & numbers)"
              onChange={ this.passwordChanged.bind(this) }
            />
          </div>

          <div className='inputLine'>
            <h4>Enter Email</h4>
            <FormControl
              type="text"
              placeholder="john@example.com"
              onChange={ this.emailChanged.bind(this) }
            />
          </div>

          <div className='inputLine'>
            <h4>Enter Date of Birth</h4>

          </div>

          <br /><br />

          <div className='inputLine'>
            <h4>Enter Weight</h4>
            <FormControl
              type="text"
              placeholder="Weight (kg)"
              onChange={ this.weightChanged.bind(this) }
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
              onClick={this.submitClicked.bind(this)}
              >
              Register
            </Button>
          </div>
          <a href="">Already a member? Log in here</a>

          <br /><br />

          <div>
            <Alert className='alert' bsStyle="warning" style={{visibility:this.state.alertStyle}}>
              <strong>Error!</strong> Please make sure all information is entered correctly
            </Alert>
          </div>

        </div>
      )
    }
  }
