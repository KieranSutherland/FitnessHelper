import React, { Component } from 'react';
import { Button, ButtonToolbar, FormControl, Alert} from 'react-bootstrap';
import { Link } from 'react-router';
import { firebaseApp } from '../firebase';
import './RegisterLogin.css';

export default class Register extends Component {
  constructor(){
    super();
    this.state = {
      email : '',
      password : '',
      fitnessChoice : '',
      weight : null,
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

    submitClicked() {
      console.log(this.state);
      let { email, password } = this.state;
      firebaseApp.auth().createUserWithEmailAndPassword(email, password).catch(error => {
        this.setState({error});
        this.setState({alertStyle: 'visible'});
      })
    }

    render() {
      return (

        <div className='container'>

          <h1>Sign up</h1>
          <br />

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
              placeholder="Password (between 4-20 letters & numbers)"
              onChange={ e => this.setState({ password : e.target.value }) }
            />
          </div>

          <div className='inputLine'>
            <h4>Date of Birth</h4>

          </div>

          <br /><br />

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
                onClick={() => this.gainClicked.bind(this)}
                style={{backgroundColor:this.state.gainColor}}>
                Gain muscle mass
              </Button>
              <Button
                className='buttonChoice'
                value='lose'
                onClick={() => this.loseClicked.bind(this)}
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
          <div><Link to={'/Login'}>Already a member? Log in here</Link></div>

          <br /><br />

          <div>
            <Alert className='alert' bsStyle="warning" style={{visibility:this.state.alertStyle}}>
              <strong>Error!</strong> {this.state.error.message}
            </Alert>
          </div>

        </div>
      )
    }
  }
