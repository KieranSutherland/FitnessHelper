import React from 'react';
import ReactDOM from 'react-dom';
import { firebaseApp } from './firebase';
import { Router, Route, browserHistory } from 'react-router';

import Home from './components/Home';
import App from './components/App';
import Login from './components/Login';
import Register from './components/Register';
import NaviBar from './components/NaviBar';

  firebaseApp.auth().onAuthStateChanged(user => {
    if(user) {
      console.log('user has signed in or up', user);
      browserHistory.push('/home');
    } else {
        console.log('user has signed out or still needs to sign in');
        browserHistory.replace('/login');
      }
  })

ReactDOM.render(
    <Router path="/" history={browserHistory}>

      <Route path="/home" component={Home} />
      <Route path="/app" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/navibar" component={NaviBar} />

    </Router>
  , document.getElementById('root')
)
