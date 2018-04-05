import React, { Component } from 'react';
import { Button, ToggleButtonGroup, ToggleButton, ButtonToolbar, FormControl, Alert, Modal} from 'react-bootstrap';
import { firebase } from '../../firebase';
import Loading from '../Loading';
import '../css/Account.css';

export default class Details extends Component {
  constructor(){
    super();
    this.state = {
      gainColor: 'white',
      loseColor: 'white',
      alertStyle : 'hidden',
      alertType : 'success',
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

    gainClicked(e) {
        this.setState({fitnessChoice : e.target.value});
        if(this.state.gainColor === 'white') {
          this.setState({gainColor: '#00C853'});
          if(this.state.loseColor === '#00C853') //If other button is already selected, deselect it
            this.setState({loseColor: 'white'});
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
            this.setState({gainColor: 'white'});
        }
        else {
            this.setState({loseColor: 'white', fitnessChoice: ''});
        }
    }

    submitClicked() {
      //Either way, there will need to be some alert to say if it was a success or fail
      this.setState({alertStyle: 'visible'});

      if(this.state.dob === '') {
        this.setState({alert: {message: 'Please enter your Date of Birth'}, alertType: 'warning' })
      }
      else if(this.state.gender === '') {
        this.setState({alert: {message: 'Please enter your gender'}, alertType: 'warning' })
      }
      else if(this.state.height === '') {
        this.setState({alert: {message: 'Please enter your height'}, alertType: 'warning' })
      }
      else if(this.state.height === '') {
        this.setState({alert: {message: 'Please enter your height'}, alertType: 'warning' })
      }
      else if(this.state.weight === '') {
        this.setState({alert: {message: 'Please enter your weight'}, alertType: 'warning' })
      }
      else {
        firebase.auth().currentUser.updateEmail(this.state.email).then(() => { //Checks if email is valid
          firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
            email: this.state.email,
            fitnessChoice: this.state.fitnessChoice,
            gender: this.state.gender,
            dob: this.state.dob,
            height: this.state.height,
            weight: this.state.weight,
          });
          this.setState({alert: {message: 'Changes have been saved successfully'}, alertType: 'success'});

          }).catch(error => {
            this.setState({alert: error, alertType: 'warning'});
          })

      }

    }

    render() {
        return (
          <section>

              <h1>Account</h1>

              <h3>Change information</h3>
            <div className='inputLine'>
              <h4>Email</h4>
              <FormControl
                type="text"
                value={this.state.email}
                placeholder="john@example.com"
                onChange={ e => this.setState({ email : e.target.value }) }
              />
            </div>

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
                Save Changes
              </Button>
            </div>
            <div>
              <Alert className='alert' bsStyle={this.state.alertType} style={{visibility:this.state.alertStyle}}>
                <strong>{this.state.alertType}!</strong> {this.state.alert.message}
              </Alert>
            </div>

        </section>
        )
      }



  }
