import React, { Component } from 'react';
import { Button, FormControl, Alert} from 'react-bootstrap';
import { Link } from 'react-router';
import { firebaseApp } from '../firebase';
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
      }
    }

    }

    submitClicked() {
      console.log(this.state);
      let { email, password } = this.state;
      firebaseApp.auth().signInWithEmailAndPassword(email, password).catch(error => {
        console.log('error');
        this.setState({error});
        this.setState({alertStyle: 'visible'});
      })
    }

    render() {
      return (

        <div>
          <NaviBar />

        <div className='container'>

          <h1>Login</h1>
          <br />

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
