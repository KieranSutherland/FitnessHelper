import React, { Component } from 'react';
import { Button, FormControl, Modal } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { firebase } from '../firebase';
import AlertPopup from './AlertPopup';
import './css/RegisterLogin.css';

export default class Login extends Component {
  constructor(){
    super();
    this.state = {
      email : '',
      password : '',
      alertStyle : 'hidden',
      error: {
        message: ''
      },
      show: false,
      resetAlertStyle : 'hidden',
      resetAlertType : 'warning',
      resetAlertHeight: '0px',
      resetAlert: {
        message: ''
      }
    }

    }

    submitClicked() {
      let { email, password } = this.state;
      firebase.auth().signInWithEmailAndPassword(email, password).catch(error => {
        this.setState({error});
        this.setState({alertStyle: 'visible'});
        // Make alert disappear after 4 seconds
        setTimeout(function () {
                this.setState({alertStyle: 'hidden'});
        }.bind(this), 4000);
      });

      // If user has successfully logged in, re-direct to diet page
      firebase.auth().onAuthStateChanged(user => {
        if(user) {
          this.props.history.push('/diet');
          }
        });
    }

    forgotPassword() {
      firebase.auth().sendPasswordResetEmail(this.state.email).then( () => {
        this.setState({resetAlert: {message: 'Email has been sent'}, resetAlertType: "success"});
      }).catch(error => {
        this.setState({resetAlert: error, resetAlertType: "warning"});
      });
        this.setState({resetAlertStyle: 'visible', resetAlertHeight: '52px'}); //Either way, there will need to be some alert to say if it was a success or fail
        // Make alert disappear after 4 seconds
        setTimeout(function () {
                this.setState({resetAlertStyle: 'hidden', resetAlertHeight: '0px'});
        }.bind(this), 4000);
    }

    render() {
      return (

        <main>

        <div className='form-container'>

          <h1>Login</h1>
          <hr />

          <div className='inputLine'>
            <h4>Email</h4>
            <FormControl
              type="text"
              placeholder="Email"
              value={this.state.email} // To match value of forgotPassword Modal if changed
              onKeyPress={e => {if(e.key === 'Enter') {this.submitClicked()}}} //Login if Enter key pressed
              onChange={ e => this.setState({ email : e.target.value }) }
            />
          </div>

          <div className='inputLine'>
            <h4>Password</h4>
            <FormControl
              type="password"
              placeholder="Password"
              onKeyPress={e => {if(e.key === 'Enter') {this.submitClicked()}}} //Login if Enter key pressed
              onChange={ e => this.setState({ password : e.target.value }) }
            />
          </div>
          <a className='forgotPassword' onClick={() => this.setState({ show: true })}>Forgot password?</a>

          <div className='inputLine'>
            <br />
            <Button
              className='submitButton'
              onClick={this.submitClicked.bind(this)}
              >
              Login
            </Button>
          </div>
          <div><NavLink to='/register'>Not a member? Register here</NavLink></div>

          <br /><br />

          <AlertPopup
            height={'52px'}
            alertType={'warning'}
            alertStyle={this.state.alertStyle}
            alertMessage={this.state.error.message}
          />

        </div>

        <Modal show={this.state.show} onHide={() => this.setState({ show: false })}>

          <Modal.Header closeButton>
            <Modal.Title>Password Reset</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <h4>Enter email to send a password reset</h4>
            <FormControl
              type="text"
              value={this.state.email} // Set value to whatever was already in the email textfield
              placeholder="Email"
              onChange={ e => this.setState({ email : e.target.value }) }
            />
            <Button
              className='sendPasswordResetButton'
              onClick={this.forgotPassword.bind(this)}
              >
              Send Email
            </Button>

            <AlertPopup
              height={this.state.resetAlertHeight}
              alertType={this.state.resetAlertType}
              alertStyle={this.state.resetAlertStyle}
              alertMessage={this.state.resetAlert.message}
            />

          </Modal.Body>

          <Modal.Footer>
            <Button onClick={() => this.setState({ show: false })}>Close</Button>
          </Modal.Footer>

        </Modal>

        </main>
      )
    }
  }
