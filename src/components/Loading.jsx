import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';

export default class Loading extends Component {
  constructor(){
    super();
    this.state = {

    }

    }

    render() {
      return (
        <main style={{margin: 'auto', width: '80px', paddingTop: '200px'}}>
            <ClipLoader
              size={80}
              color={'#00C853'}
              loading={true}
            />
        </main>
      )
    }

  }
