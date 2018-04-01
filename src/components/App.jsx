import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import './css/App.css';

import NaviBar from './NaviBar';

import Home from './Home';
import Diet from './Diet';
import CalorieHistory from './CalorieHistory';
import Exercise from './Exercise';

import Login from './Login';
import Register from './Register';

import Account from './Account';
import ContactUs from './ContactUs';
import AboutUs from './AboutUs';

export default class App extends Component {
  constructor(){
    super();
    this.state = {

    }

    }

    render() {
      return (
        <main>
          
          <Router history={browserHistory}>
            <Route path='/' component={NaviBar}>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />

              <Route path="/" component={Home} />
              <Route path="/diet" component={Diet} />
              <Route path="/calorie_history" component={CalorieHistory} />
              <Route path="/exercise" component={Exercise} />

              <Route path="account" component={Account} />
              <Route path="/contact_us" component={ContactUs} />
              <Route path="/about_us" component={AboutUs} />
            </Route>
          </Router>
        </main>
      )
    }

  }
