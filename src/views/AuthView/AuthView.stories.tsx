import React from 'react';

import {interactWithCanvas} from '../../utils/storyInteractions.js';
import {AuthView} from './AuthView.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof AuthView> = {
  component: AuthView,
  parameters: {
    layout: 'fullscreen'
  },
  title: 'Views/Auth/AuthView'
};

export default meta;

type Story = StoryObj<typeof AuthView>;

export const Default: Story = {
  args: {
    cardDescription: 'Use your account credentials to continue.',
    cardTitle: 'Sign in',
    children: <div className="text-sm text-muted-foreground">Auth form content</div>,
    description: 'Sign in once to return to everything your account can access.',
    eyebrow: 'Acme identity',
    title: <>Welcome<br />back.</>
  },
  play: interactWithCanvas
};
