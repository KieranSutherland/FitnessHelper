import React, { Component } from 'react';
import { firebaseApp } from '../firebase';
import { Link } from 'react-router';
import { Button} from 'react-bootstrap';
import NaviBar from './NaviBar';
import './Home.css';

export default class Home extends Component {
  constructor(){
    super();
    this.state = {

    }
    }


render() {
  return(

    <div>
      <NaviBar />
      <div><Link to={'/Register'}>Not a member? Register here</Link></div>
      <Button onClick={() => firebaseApp.auth().signOut()}>Sign out</Button>

    </div>



  )
}
  }
