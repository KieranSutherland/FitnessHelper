import React, { Component } from 'react';
import { Button, FormControl, Alert, Modal, OverlayTrigger, } from 'react-bootstrap';
import { Link } from 'react-router';
import { firebase } from '../firebase';
import NaviBar from './NaviBar';
import './RegisterLogin.css';

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
      resetAlertType : 'Success',
      resetAlert: {
        message: ''
      }
    }

    }

    submitClicked() {
      let { email, password } = this.state;
      firebase.auth().signInWithEmailAndPassword(email, password).catch(error => {
        console.log('error');
        this.setState({error});
        this.setState({alertStyle: 'visible'});
      })
    }

    forgotPassword() {
      firebase.auth().sendPasswordResetEmail(this.state.email).then( () => {
        this.setState({resetAlert: {message: 'Email has been sent'}, resetAlertType: 'success'});
      }).catch(error => {
        this.setState({resetAlert: error, resetAlertType: 'warning'});
      });
        this.setState({resetAlertStyle: 'visible'}); //Either way, there will need to be some alert to say if it was a success or fail
    }

    render() {
      return (

        <div>
          <NaviBar />

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
                  className='passwordResetButton'
                  onClick={this.forgotPassword.bind(this)}
                  >
                  Send Email
                </Button>
                <Alert className='alert' bsStyle={this.state.resetAlertType} style={{visibility:this.state.resetAlertStyle}}>
                  <strong>{this.state.resetAlertType}!</strong> {this.state.resetAlert.message}
                </Alert>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => this.setState({ show: false })}>Close</Button>
              </Modal.Footer>
            </Modal>

        <div className='container'>

          <h1>Login</h1>
          <hr />

          <div className='inputLine'>
            <h4>Email</h4>
            <FormControl
              type="text"
              placeholder="Email"
              onChange={ e => this.setState({ email : e.target.value }) }
            />
          </div>

          <div className='inputLine'>
            <h4>Password</h4>
            <FormControl
              type="password"
              placeholder="Password"
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
          <div><Link to={'/Register'}>Not a member? Register here</Link></div>

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
