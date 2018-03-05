import React, { Component } from 'react';
import { Button, ToggleButtonGroup, ToggleButton, ButtonToolbar, FormControl, Alert} from 'react-bootstrap';
import { firebase } from '../firebase';
import NaviBar from './NaviBar';
import './Account.css';

export default class Account extends Component {
  constructor(){
    super();
    this.state = {
      email : '',
      password : '',
      fitnessChoice : '',
      gender: 'male',
      dob: '',
      height: '',
      weight : null,
      calories: 0,
      gainColor: 'white',
      loseColor: 'white',
      alertStyle : 'hidden',
      error: {
        message: ''
      }
    }

    }

    componentDidMount() {

      firebase.auth().onAuthStateChanged(user => {

        if(user) {
          console.log('Updating account info');
          firebase.database().ref('/users/' + user.uid).once('value').then(snapshot => {
            let email = (snapshot.val() && snapshot.val().email);
            this.setState({email});
            console.log('test2', this.state);
          });

          }
          console.log('test3', this.state);
      });
      console.log('test4', this.state);
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

    render() {
      return (
        <div>
          <NaviBar />
          <div className='account-container'>

            <h1>Account</h1>

            <h3>Change information</h3>
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
            <FormControl
              type="date"
              placeholder="dd/mm/yyyy"
              onChange={ e => this.setState({ dob : e.target.value }) }
            />
          </div>

          <div className='inputLine'>
            <h4>Gender</h4>
              <ToggleButtonGroup className='radio' type="radio" name="options" defaultValue={'male'}>
                <ToggleButton value={'male'} onChange={e => this.setState({ gender : e.target.value })}>Male</ToggleButton>
                <ToggleButton value={'female'} onChange={e => this.setState({ gender : e.target.value })}>Female</ToggleButton>
              </ToggleButtonGroup>
          </div>

          <div className='inputLine'>
            <h4>Height</h4>
            <FormControl
              type="text"
              placeholder="Heigh (cm)"
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
              Save Changes
            </Button>
          </div>
        </div>

      </div>
      )
    }

  }
