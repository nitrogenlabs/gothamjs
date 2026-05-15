import React from 'react';
import {MemoryRouter} from 'react-router';
import {Config} from '../../config/appConfig.js';
import {focusCanvas} from '../../utils/storyInteractions.js';
import {AuthRoute} from './AuthRoute.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof AuthRoute> = {
  argTypes: {
    children: {
      control: 'text'
    }
  },
  component: AuthRoute,
  parameters: {
    layout: 'centered'
  },
  title: 'Components/AuthRoute'
};

export default meta;

type Story = StoryObj<typeof AuthRoute>;

export const Default: Story = {
  args: {
    children: 'Authenticated content'
  },
  play: focusCanvas,
  render: (args) => (
    <AuthenticatedRouteStory {...args} />
  )
};

const AuthenticatedRouteStory = (args: {children?: string}) => {
  Config.set({isAuth: () => true});

  return (
    <MemoryRouter initialEntries={['/secure']}>
      <AuthRoute>
        <div>{args.children}</div>
      </AuthRoute>
    </MemoryRouter>
  );
};
