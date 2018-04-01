import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import './css/AboutUs.css';

export default class AboutUs extends Component {
  constructor(){
    super();
    this.state = {

    }

    }

    render() {
      return (
        <main>
          <div style={{margin: 'auto', width: '80px', 'padding-top': '200px'}}>
            <ClipLoader
              size={80}
              color={'#00C853'}
              loading={true}
            />
          </div>
        </main>
      )
    }

  }
