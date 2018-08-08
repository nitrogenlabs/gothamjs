import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Svg} from './components/Svg';
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
        topBar: {
          logo: <Svg name="gotham" width={175} height={50} />,
          menu: [
            {name: 'Login', url: '/login'},
            {name: 'Signup', url: '/signup'}
          ],
          solidTextColor: '#fff',
          transparentTextColor: '#fff'
        }
      },
      routes: [
        {
          path: '/',
          props: {
            features: [
              {
                align: 'right',
                details: 'Lex is a console line execution tool. Works out of the box for any React project, taking care of all your development needs. No need to install unit testing, transpilers, compilers, or even development servers. Install Lex globally and let go of all the grunt work, allowing you focus on coding your app.',
                image: <img src="http://lex.nitrogenlabs.com/img/screenshot-1.png" />,
                title: 'What is Lex?'
              }
            ],
            footer: {
              copyright: 'Copyright &copy; 2018 Nitrogen Labs, Inc.',
              logo: <Svg name="gotham-logo" width={30} height={30} />,
              menu: [
                {
                  menu: [
                    {name: 'About', url: '/about'},
                    {name: 'Getting Started', url: '/gettingStarted'},
                    {name: 'Configuration', url: '/config'},
                    {name: 'Setup', url: '/setup'},
                    {name: 'API Reference', url: '/api'}
                  ],
                  name: 'Documentation'
                },
                {
                  menu: [
                    {name: 'StackOverflow', url: 'http://stackoverflow.com/questions/tagged/lexjs'},
                    {name: 'Chat', url: 'https://discord.gg/Ttgev58'},
                    {name: 'Facebook', url: 'https://www.facebook.com/nitrogenlabs'}
                  ],
                  name: 'Community'
                },
                {
                  menu: [
                    {name: 'NPM', url: 'https://npmjs.com/@nlabs/gothamjs'},
                    {name: 'Git', url: 'https://github.com/nitrogenlabs/gotham'}
                  ],
                  name: 'More'
                }
              ]
            },
            promoRow: {
              list: [
                {
                  details: 'Bundling your app with Webpack 4!',
                  image: <Svg name="gotham-logo" width={50} height={50} />,
                  title: 'Webpack'
                },
                {
                  details: 'Transpile ES-next, Flow and Typescript',
                  image: <Svg name="gotham-logo" width={50} height={50} />,
                  title: 'Babel'
                },
                {
                  details: 'Unit Test has never been easier.',
                  image: <Svg name="gotham-logo" width={50} height={50} />,
                  title: 'Jest'
                }
              ]
            },
            splash: {
              backgroundImage: 'http://lex.nitrogenlabs.com/img/bg-image.jpg',
              backgroundTextColor: '#fff',
              buttons: [
                {label: 'Quick Start', url: '/quickStart'},
                {label: 'API', url: '/api'}
              ],
              image: <Svg name="gotham-logo" width={130} height={130} />
            }
          },
          title: 'Welcome',
          view: 'home'
        },
        {
          path: '/login',
          props: {
            logo: <Svg name="gotham-logo" width={130} height={130} />
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
