import React, { Component } from 'react';
import './App.css';
import NaviBar from './NaviBar';
import Login from './Login';
import Home from './Home';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      info: [],
      user: false
    }
  }

  render() {
    if (this.state.user) return (
      <div><NaviBar /> <Home /></div>);
    else return (
      <div><NaviBar /> <Login /></div>);

  }

}
