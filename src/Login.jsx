import React, { Component } from 'react';
import { Button, ButtonToolbar, FormControl, Alert} from 'react-bootstrap';
import './Login.css';

export default class Login extends Component {
  constructor(){
    super();
    this.state = {
      username : '',
      password : '',
      alertStyle : 'hidden'
    }

    }

    usernameChanged(e) {
      this.setState({ username : e.target.value });
    }

    passwordChanged(e) {
      this.setState({ password : e.target.value });
    }

    submitClicked() {
      console.log(this.state);
      if(this.state.username !== 'admin') {
        this.setState({alertStyle: 'visible'})
      }
      if(this.state.password !== 'password') {
        this.setState({alertStyle: 'visible'})
      }
    }

    render() {
      return (

        <div className='container'>

          <h1>Login</h1>
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
              placeholder="Password"
              onChange={ this.passwordChanged.bind(this) }
            />
          </div>
          <a href="">Forgot password?</a>

          <div className='inputLine'>
            <br />
            <Button
              className='submitButton'
              onClick={this.submitClicked.bind(this)}
              >
              Login
            </Button>
          </div>
          <a href="">Not a member? Register here</a>

          <br /><br />

          <div>
            <Alert className='alert' bsStyle="warning" style={{visibility:this.state.alertStyle}}>
              <strong>Error!</strong> Account not found
            </Alert>
          </div>

        </div>
      )
    }
  }
