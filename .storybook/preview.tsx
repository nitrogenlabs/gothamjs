import '../src/styles/index.css';
import {Flux} from '@nlabs/arkhamjs';
import {FluxProvider} from '@nlabs/arkhamjs-utils-react';
import React from 'react';

import type {Preview} from '@storybook/react';

const preview: Preview = {
  decorators: [
    (Story) => (
      <FluxProvider flux={Flux}>
        <div className="flex flex-col items-center justify-center w-full">
          <Story />
        </div>
      </FluxProvider>
    )
  ],
  parameters: {
    actions: {argTypesRegex: '^on[A-Z].*'},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
};

export default preview;
