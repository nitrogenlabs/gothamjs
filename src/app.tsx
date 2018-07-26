import './styles/app.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Icon} from './components/Icon';
import {GothamConfiguration} from './types/views/gotham';
import {Gotham} from './views/Gotham';

const target = document.getElementById('app');

// CONFIGURATION
const config: GothamConfiguration = {
  name: 'gothamjs',
  routes: [
    {
      container: 'default',
      logo: <Icon name="gotham" width={175} height={50} />,
      path: '/',
      routes: [
        {
          path: '/',
          title: 'Welcome',
          view: 'home'
        },
        {
          logo: <Icon name="gotham-logo" width={130} height={130} />,
          path: '/login',
          title: 'Login',
          view: 'login'
        },
        {
          external: 'https://raw.githubusercontent.com/nitrogenlabs/arkhamjs/master/README.md',
          path: '/markdown',
          title: 'Markdown',
          view: 'markdown'
        },
        {
          external: './docs/demo.md',
          path: '/markdownDemo',
          title: 'Markdown',
          view: 'markdown'
        }
      ],
      topBar: {
        menu: [
          {name: 'Login', url: '/login'},
          {name: 'Signup', url: '/signup'}
        ]
      }
    }
  ],
  title: 'GothamJS'
};

// Render initial ReactJS code
ReactDOM.render(<Gotham config={config} />, target);
