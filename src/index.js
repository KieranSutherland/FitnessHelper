import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import Home from './components/Home';
import Diet from './components/Diet';
import CalorieHistory from './components/CalorieHistory';
import Exercise from './components/Exercise';

import Login from './components/Login';
import Register from './components/Register';

import Account from './components/Account';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';

ReactDOM.render(

    <Router history={browserHistory}>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        <Route path="/" component={Home} />
        <Route path="/diet" component={Diet} />
        <Route path="/calorie_history" component={CalorieHistory} />
        <Route path="/exercise" component={Exercise} />

        <Route path="/account" component={Account} />
        <Route path="/contact_us" component={ContactUs} />
        <Route path="/about_us" component={AboutUs} />
    </Router>

  , document.getElementById('root')
)
