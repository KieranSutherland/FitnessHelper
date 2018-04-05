import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import NaviBar from './components/NaviBar';

import Home from './components/Home';
import Diet from './components/Diet/Diet';
import CalorieHistory from './components/Diet/CalorieHistory';
import Exercise from './components/Exercise/Exercise';

import Login from './components/Login';
import Register from './components/Register';

import Account from './components/Account/Account';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';

import NotFound from './components/NotFound';

ReactDOM.render(
  <Router>
    <main>
      <Route component={NaviBar} />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        <Route exact path="/" component={Home} />
        <Route path="/diet" component={Diet} />
        <Route path="/calorie_history" component={CalorieHistory} />
        <Route path="/exercise" component={Exercise} />

        <Route path="/account" component={Account} />
        <Route path="/contact_us" component={ContactUs} />
        <Route path="/about_us" component={AboutUs} />
        <Route component={NotFound} />
      </Switch>
    </main>
  </Router>
  , document.getElementById('root')
)
