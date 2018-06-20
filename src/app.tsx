import './styles/app.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {AppView} from './views/AppView/AppView';

const target = document.getElementById('app');

// CUSTOM PARAMETERS
const siteTitle: string = 'GothamJS';

// Route Example
const routes = [
  {
    isContainer: true,
    path: '/',
    routes: [
      {
        asyncComponent: {component: () => import('./views/HomeView/HomeView'), name: 'HomeView'},
        path: '/',
        title: 'Welcome'
      },
      {
        asyncComponent: {component: () => import('./views/LoginView/LoginView'), name: 'LoginView'},
        path: '/login',
        title: 'Login'
      }
    ],
    title: 'GothamJS'
  }
];

// Render initial ReactJS code
ReactDOM.render(<AppView routes={routes} title={siteTitle} />, target);
