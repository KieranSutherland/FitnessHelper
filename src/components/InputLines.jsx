import React, { Component } from 'react';
import { Button, ToggleButtonGroup, ToggleButton, ButtonToolbar, FormControl, Alert} from 'react-bootstrap';
import { firebase } from '../firebase';
import './css/RegisterLogin.css';

export default class InputLines extends Component {
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

      // Make alert disappear after 4 seconds
      setTimeout(function () {
              this.setState({alertStyle: 'hidden'});
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

            <div>
              <Alert className='alert' bsStyle={this.state.alertType} style={{visibility:this.state.alertStyle}}>
                <strong>{this.state.alertType}!</strong> {this.state.alert.message}
              </Alert>
            </div>

        </section>
        )
      }



  }
