import React, { Component } from 'react';
import { Button, ToggleButtonGroup, ToggleButton, ButtonToolbar, FormControl, Alert, Modal} from 'react-bootstrap';
import { firebase } from '../../firebase';
import Loading from '../Loading';
import '../css/Account.css';

export default class PasswordReset extends Component {
  constructor(){
    super();
    this.state = {
      passwordAlertStyle : 'hidden',
      passwordAlertType : 'success',
      passwordAlert: {
        message: ''
      }
    }

    }

    passwordSubmitClicked() {
      if(this.state.password1 !== this.state.password2) {
        this.setState({passwordAlert: {message: 'Passwords do not match'}, passwordAlertType: 'warning'});
      }
      else {
        firebase.auth().currentUser.updatePassword(this.state.password1).then(() => {
          this.setState({passwordAlert: {message: 'Password has been successfully changed'}, passwordAlertType: 'success'});
        }).catch(error => {
          this.setState({passwordAlert: error, passwordAlertType: 'warning'});
        });
      }
      //Either way, there will need to be some alert to say if it was a success or fail
      this.setState({passwordAlertStyle: 'visible'});
      // Make alert disappear after 4 seconds
      setTimeout(function () {
              this.setState({passwordAlertStyle: 'hidden'});
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

            <div>
              <Alert className='alert' bsStyle={this.state.passwordAlertType} style={{visibility:this.state.passwordAlertStyle}}>
                <strong>{this.state.passwordAlertType}!</strong> {this.state.passwordAlert.message}
              </Alert>
            </div>

        </section>
        )
      }

  }
