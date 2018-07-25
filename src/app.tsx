import './styles/app.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Icon} from './components/Icon';
import {Gotham} from './views/Gotham';

const target = document.getElementById('app');

// CUSTOM PARAMETERS
const siteTitle: string = 'GothamJS';

// Route Example
const routes = [
  {
    isContainer: true,
    logo: <Icon name="gotham" width={175} height={50} />,
    menu: [],
    path: '/',
    routes: [
      {
        asyncComponent: () => import('./views/HomeView'),
        path: '/',
        title: 'Welcome'
      },
      {
        asyncComponent: () => import('./views/LoginView'),
        logo: <Icon name="gotham-logo" width={130} height={130} />,
        path: '/login',
        title: 'Login'
      },
      {
        asyncComponent: () => import('./views/MarkdownView'),
        external: 'https://raw.githubusercontent.com/nitrogenlabs/arkhamjs/master/README.md',
        path: '/markdown',
        title: 'Markdown'
      },
      {
        asyncComponent: () => import('./views/MarkdownView'),
        external: './docs/demo.md',
        path: '/markdownDemo',
        title: 'Markdown'
      }
    ]
  }
];

// Render initial ReactJS code
ReactDOM.render(<Gotham routes={routes} title={siteTitle} />, target);
