import React from 'react';
import {focusCanvas} from '../../utils/storyInteractions.js';
import {Alert, AlertDescription, AlertTitle} from './Alert.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof Alert> = {
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive']
    }
  },
  component: Alert,
  parameters: {
    layout: 'centered'
  },
  title: 'Components/Alert'
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    variant: 'default'
  },
  play: focusCanvas,
  render: (args) => (
    <Alert {...args} className="max-w-md">
      <AlertTitle>Deployment complete</AlertTitle>
      <AlertDescription>The component package was published successfully.</AlertDescription>
    </Alert>
  )
};

export const Destructive: Story = {
  args: {
    variant: 'destructive'
  },
  play: focusCanvas,
  render: (args) => (
    <Alert {...args} className="max-w-md">
      <AlertTitle>Build failed</AlertTitle>
      <AlertDescription>Review the latest Storybook interaction output before releasing.</AlertDescription>
    </Alert>
  )
};
