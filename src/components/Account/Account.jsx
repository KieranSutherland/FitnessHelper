import React, { Component } from 'react';
import { Button, ToggleButtonGroup, ToggleButton, ButtonToolbar, FormControl, Alert, Modal} from 'react-bootstrap';
import { firebase } from '../../firebase';
import Loading from '../Loading';
import InputLines from '../InputLines';
import PasswordReset from './PasswordReset';
import DeleteAccount from './DeleteAccount';
import '../css/Account.css';

export default class Account extends Component {
  constructor(){
    super();
    this.state = {
      isLoading: true
    }

    }

    componentDidMount() {

      firebase.auth().onAuthStateChanged(user => {

        if(user) {
          firebase.database().ref('/users/' + user.uid).once('value').then(snapshot => {
            this.setState({ // Set values to current user's data
              email: (snapshot.val() && snapshot.val().email),
              fitnessChoice: (snapshot.val() && snapshot.val().fitnessChoice),
              gender: (snapshot.val() && snapshot.val().gender),
              dob: (snapshot.val() && snapshot.val().dob),
              height: (snapshot.val() && snapshot.val().height),
              weight: (snapshot.val() && snapshot.val().weight),
              isLoading: false
            });
          });
          }
          else {
            this.props.history.push('/login'); //User isn't allowed to access this page without being logged in first
          }

      });
    }



    render() {
      if(this.state.isLoading === true)  {
        return ( <Loading /> );
      }
      else {
        return (
          <main>

            <div className='form-container'>

              <h1>Account</h1>
              <hr />

              <InputLines
                header='Change information'
                submitButtonName='Save Changes'
                email={this.state.email}
                fitnessChoice={this.state.fitnessChoice}
                gender={this.state.gender}
                dob={this.state.dob}
                height={this.state.height}
                weight={this.state.weight}
              />

            <hr />

            <PasswordReset />

            <hr />

            <DeleteAccount />

          </div>

        </main>
        )
      }

    }

  }
