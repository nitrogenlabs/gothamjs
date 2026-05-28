import React from 'react';
import {interactWithCanvas} from '../../utils/storyInteractions.js';
import {Checkbox} from './Checkbox.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof Checkbox> = {
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'success', 'warning']
    },
    defaultValue: {
      control: 'boolean'
    },
    description: {
      control: 'text'
    },
    error: {
      control: 'text'
    },
    label: {
      control: 'text'
    }
  },
  component: Checkbox,
  parameters: {
    layout: 'centered'
  },
  title: 'Components/Checkbox'
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    color: 'primary',
    defaultValue: false,
    description: 'Receive release and security notifications.',
    label: 'Subscribe to updates',
    name: 'subscribe'
  },
  play: interactWithCanvas,
  render: (args) => <Checkbox {...args} />
};
