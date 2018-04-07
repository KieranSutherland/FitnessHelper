import React, { Component } from 'react';
import { Button, FormControl} from 'react-bootstrap';
import { firebase } from '../../firebase';
import AlertPopup from '../AlertPopup';
import '../css/Account.css';

export default class PasswordReset extends Component {
  constructor(){
    super();
    this.state = {
      password1: '',
      password2: '',
      alertStyle: 'hidden',
      alertType: 'success',
      alertHeight: '0px',
      alert: {
        message: ''
      }
    }

    }

    passwordSubmitClicked() {
      if(this.state.password1 !== this.state.password2) {
        this.setState({alert: {message: 'Passwords do not match'}, alertType: 'warning'});
      }
      else {
        firebase.auth().currentUser.updatePassword(this.state.password1).then(() => {
          this.setState({alert: {message: 'Password has been successfully changed'}, alertType: 'success'});
        }).catch(error => {
          this.setState({alert: error, alertType: 'warning'});
        });
      }
      //Either way, there will need to be some alert to say if it was a success or fail
      this.setState({alertStyle: 'visible', alertHeight: '52px'});
      // Make alert disappear after 4 seconds
      setTimeout(function () {
              this.setState({alertStyle: 'hidden', alertHeight: '0px'});
      }.bind(this), 4000);
    }

    render() {
        return (
          <section>

            <h3>Change password</h3>
            <div className='inputLine'>
              <h4>Password</h4>
              <FormControl
                type="password"
                placeholder="Password (6 or more letters & numbers)"
                onChange={ e => this.setState({ password1 : e.target.value }) }
              />
            </div>
            <div className='inputLine'>
              <h4>Re-enter password</h4>
              <FormControl
                type="password"
                placeholder="Password"
                onKeyPress={e => {if(e.key === 'Enter') {this.passwordSubmitClicked()}}}
                onChange={ e => this.setState({ password2 : e.target.value }) }
              />
            </div>
            <div className='inputLine'>
              <br />
              <Button
                className='submitButton'
                onClick={ () => this.passwordSubmitClicked() }
                >
                Change Password
              </Button>
            </div>

            <AlertPopup
              height={this.state.alertHeight}
              alertType={this.state.alertType}
              alertStyle={this.state.alertStyle}
              alertMessage={this.state.alert.message}
            />

        </section>
        )
      }

  }
