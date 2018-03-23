import React, { Component } from 'react';
import NaviBar from './NaviBar';
import './css/ContactUs.css';

export default class ContactUs extends Component {
  constructor(){
    super();
    this.state = {

    }

    }

    render() {
      return (
        <main>
          <NaviBar />
          <div className='content-container'>

          <h1>Contact Us</h1>
          <hr />
          <p><h3><strong>Lead Designer/Programmer</strong></h3></p>
          <p><strong>Name: </strong>Kieran Sutherland</p>
          <p><strong>Email: </strong>p15229545@my365.dmu.ac.uk</p>
          <p><strong>Address: </strong>Gateway House, Leicester, LE1 9BH</p>

        </div>
        </main>
      )
    }

  }
