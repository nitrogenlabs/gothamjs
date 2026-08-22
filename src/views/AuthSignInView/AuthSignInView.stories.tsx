import React from 'react';

import {interactWithCanvas} from '../../utils/storyInteractions.js';
import {AuthSignInView} from './AuthSignInView.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof AuthSignInView> = {
  component: AuthSignInView,
  parameters: {
    layout: 'fullscreen'
  },
  title: 'Views/Auth/AuthSignInView'
};

export default meta;

type Story = StoryObj<typeof AuthSignInView>;

export const Default: Story = {
  args: {
    description: 'Sign in once to return to everything your account can access.',
    eyebrow: 'Acme identity',
    onSubmit: async () => {},
    title: <>Welcome<br />back.</>
  },
  play: interactWithCanvas
};
