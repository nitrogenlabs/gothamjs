/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import { createRoot } from 'react-dom/client';

import {Svg} from './components/Svg/Svg';
import {Gotham} from './views/Gotham/Gotham';

import type {GothamConfiguration} from './views/Gotham/GothamProvider';

const config: GothamConfiguration = {
  name: 'gothamjs',
  routes: [
    {
      path: '/',
      props: {
        topBar: {
          logo: <Svg name="gotham" width={175} height={50} />,
          menu: [
            {label: 'Sign In', url: '/signIn'},
            {label: 'Sign Up', url: '/signUp'}
          ],
          solidTextColor: '#fff',
          transparentTextColor: '#fff'
        }
      },
      routes: [
        {
          path: '/home',
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
              logo: <Svg name="gotham-logo" width={60} height={60} />,
              menu: [
                {
                  label: 'Documentation',
                  menu: [
                    {label: 'About', url: '/about'},
                    {label: 'Getting Started', url: '/gettingStarted'},
                    {label: 'Configuration', url: '/config'},
                    {label: 'Setup', url: '/setup'},
                    {label: 'API Reference', url: '/api'}
                  ]
                },
                {
                  label: 'Community',
                  menu: [
                    {label: 'StackOverflow', url: 'http://stackoverflow.com/questions/tagged/lexjs'},
                    {label: 'Chat', url: 'https://discord.gg/Ttgev58'},
                    {label: 'Facebook', url: 'https://www.facebook.com/nitrogenlabs'}
                  ]
                },
                {
                  label: 'More',
                  menu: [
                    {label: 'NPM', url: 'https://npmjs.com/@nlabs/gothamjs'},
                    {label: 'Git', url: 'https://github.com/nitrogenlabs/gotham'}
                  ]
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
            },
            title: 'Welcome'
          }
        }
      ],
      view: 'home'
    }
  ],
  title: 'GothamJS'
};

const root = createRoot(document.getElementById('app'));
root.render(<Gotham config={config} />);