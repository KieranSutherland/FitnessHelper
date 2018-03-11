import React from 'react';
import ReactDOM from 'react-dom';
import { firebase } from './firebase';
import { Router, Route, browserHistory } from 'react-router';

import Home from './components/Home';
import Diet from './components/Diet';
import Exercise from './components/Exercise';

import Login from './components/Login';
import Register from './components/Register';

import Account from './components/Account';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';
import NaviBar from './components/NaviBar';

  firebase.auth().onAuthStateChanged(user => {
    if(user) {
      browserHistory.push('/exercise');
      }
      else {
        browserHistory.replace('/login');
      }
  })

ReactDOM.render(
    <Router path="/" history={browserHistory}>
      <Route path="/home" component={Home} />
      <Route path="/diet" component={Diet} />
      <Route path="/exercise" component={Exercise} />

      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />

      <Route path="/account" component={Account} />
      <Route path="/contact_us" component={ContactUs} />
      <Route path="/about_us" component={AboutUs} />

    </Router>

  , document.getElementById('root')
)
