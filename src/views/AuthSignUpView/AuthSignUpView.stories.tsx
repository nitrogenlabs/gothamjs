import React from 'react';

import {interactWithCanvas} from '../../utils/storyInteractions.js';
import {AuthSignUpView} from './AuthSignUpView.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof AuthSignUpView> = {
  component: AuthSignUpView,
  parameters: {
    layout: 'fullscreen'
  },
  title: 'Views/Auth/AuthSignUpView'
};

export default meta;

type Story = StoryObj<typeof AuthSignUpView>;

export const Default: Story = {
  args: {
    description: 'Create an account and start building your workspace.',
    eyebrow: 'Acme identity',
    onSubmit: async () => {},
    resendVerificationHref: '/verify/resend',
    title: <>Join the<br />community.</>
  },
  play: interactWithCanvas
};
