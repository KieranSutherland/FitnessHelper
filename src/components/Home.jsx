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
      <div>Home</div>

    </div>



  )
}
  }
