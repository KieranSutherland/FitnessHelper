import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Diet from './Diet';
import Exercise from './Exercise';

import Login from './Login';
import Register from './Register';

import Account from './Account';
import ContactUs from './ContactUs';
import AboutUs from './AboutUs';

const Main = () => (
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/diet" component={Diet} />
        <Route path="/exercise" component={Exercise} />

        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        <Route path="/account" component={Account} />
        <Route path="/contact_us" component={ContactUs} />
        <Route path="/about_us" component={AboutUs} />
      </Switch>
    );

    export default Main;
