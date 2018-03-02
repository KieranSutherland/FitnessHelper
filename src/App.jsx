import React, { Component } from 'react';
import './App.css';
import NaviBar from './NaviBar';
import Register from './Register';
import Login from './Login';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      info: []
    }
  }

  componentWillMount(){

  }

  render() {

    return (
      <div className="App">
        <NaviBar />
        <Login />
      </div>
    );

  }

}
