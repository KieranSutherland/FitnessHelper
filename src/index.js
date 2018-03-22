import React from 'react';
import ReactDOM from 'react-dom';
import { firebase } from './firebase';
import { Router, Route, browserHistory } from 'react-router';

import Home from './components/Home';
import Diet from './components/Diet';
import ExerciseGain from './components/ExerciseGain';
import ExerciseLose from './components/ExerciseLose';
import CalorieHistory from './components/CalorieHistory';

import Login from './components/Login';
import Register from './components/Register';

import Account from './components/Account';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';

  firebase.auth().onAuthStateChanged(user => {
    if(!user) { // If user has not signed in, re-direct to login page
        browserHistory.replace('/login');
      }
  })

ReactDOM.render(

    <Router path="/" history={browserHistory}>
        <Route path="/home" component={Home} />
        <Route path="/diet" component={Diet} />
        <Route path="/exercise_gain" component={ExerciseGain} />
        <Route path="/exercise_lose" component={ExerciseLose} />
        <Route path="/calorie_history" component={CalorieHistory} />

        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        <Route path="/account" component={Account} />
        <Route path="/contact_us" component={ContactUs} />
        <Route path="/about_us" component={AboutUs} />
    </Router>

  , document.getElementById('root')
)
