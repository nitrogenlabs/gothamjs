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
      path: '/',
      props: {
        logo: <Icon name="gotham" width={175} height={50} />,
        topBar: {
          menu: [
            {name: 'Login', url: '/login'},
            {name: 'Signup', url: '/signup'}
          ]
        }
      },
      routes: [
        {
          path: '/',
          title: 'Welcome',
          view: 'home'
        },
        {
          path: '/login',
          props: {
            logo: <Icon name="gotham-logo" width={130} height={130} />
          },
          title: 'Login',
          view: 'login'
        },
        {
          path: '/markdown',
          props: {
            external: 'https://raw.githubusercontent.com/nitrogenlabs/arkhamjs/master/README.md'
          },
          title: 'Markdown',
          view: 'markdown'
        },
        {
          path: '/markdownDemo',
          props: {
            external: './docs/demo.md'
          },
          title: 'Markdown',
          view: 'markdown'
        }
      ]
    }
  ],
  title: 'GothamJS'
};

// Render initial ReactJS code
ReactDOM.render(<Gotham config={config} />, target);
