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


  firebase.auth().onAuthStateChanged(user => {
    if(user) {
      console.log('user has signed in or up', user);
      browserHistory.push('/home');
      firebase.database().ref().child('users/' + user.uid).once('value').then(function(snapshot) {
        console.log(snapshot.val().email);
      });
      }
      else {
        console.log('user has signed out or still needs to sign in');
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
