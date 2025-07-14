import '../src/styles/index.css';
import {Flux} from '@nlabs/arkhamjs';
import {FluxProvider} from '@nlabs/arkhamjs-utils-react';
import {withThemeByClassName} from '@storybook/addon-themes';
import React from 'react';

import type {Preview} from '@storybook/react';
import type {Renderer} from 'storybook/internal/types';

const preview: Preview = {
  decorators: [
    (Story) => (
      <FluxProvider flux={Flux}>
        <div className="bg-background-white dark:bg-background-black-dark flex flex-col items-center justify-center min-h-screen w-full p-4">
          <div className="mx-auto max-w-4xl">
            <Story />
          </div>
        </div>
      </FluxProvider>
    ),
    withThemeByClassName<Renderer>({
      defaultTheme: 'light',
      themes: {
        dark: 'dark',
        light: ''
      }
    })
  ],
  parameters: {
    actions: {argTypesRegex: '^on[A-Z].*'},
    backgrounds: {
      default: 'light',
      values: [
        {name: 'light', value: '#111111'},
        {name: 'dark', value: '#999999'}
      ]
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    docs: {
      autodocs: true
    },
    layout: 'fullscreen',
    themes: {
      default: 'light',
      list: [
        {class: 'light', name: 'light'},
        {class: 'dark', name: 'dark'}
      ]
    }
  }
};

export default preview;
