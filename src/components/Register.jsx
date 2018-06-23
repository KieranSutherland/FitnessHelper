import React, { Component } from 'react';
import { FormControl} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import InputLines from './InputLines';
import './css/RegisterLogin.css';

export default class Register extends Component {
  constructor(){
    super();
    this.state = {

    }

    }

    render() {
      return (

        <main>

        <div className='form-container'>

          <h1>Register</h1>
          <hr />

          <InputLines
            submitButtonName='Register'
            email=''
            password={this.state.password}
            passwordDiv={
              <div className='inputLine'>
                <h4>Password</h4>
                <FormControl
                  type="password"
                  placeholder="Password (6 or more letters & numbers)"
                  onChange={ e => this.setState({ password : e.target.value }) }
                />
              </div>
            }
            fitnessChoice='gain' // For default left button activated
            gender=''
            dob=''
            height=''
            weight=''
            footer={<div><NavLink to={'/login'}>Already a member? Log in here</NavLink><br /><br /></div>}
            history={this.props.history}
          />

        </div>

      </main>
      )
    }
  }
