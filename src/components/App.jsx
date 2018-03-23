import React, { Component } from 'react';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import './css/App.css';


import NaviBar from './NaviBar';
import Main from './main';



const App = () => (
      <div className='app'>
        <NaviBar />
        <Main />
      </div>
    );

    export default App;
