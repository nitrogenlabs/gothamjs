import React from 'react';
import {interactWithCanvas} from '../../utils/storyInteractions.js';
import {Input} from './Input.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';
const meta: Meta<typeof Input> = {
  argTypes: {
    defaultValue: {
      control: 'text'
    },
    disabled: {
      control: 'boolean'
    },
    name: {
      control: 'text'
    },
    placeholder: {
      control: 'text'
    }
  },
  component: Input,
  parameters: {
    layout: 'centered'
  },
  title: 'Components/Input'
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    className: 'w-80 rounded-md border px-3 py-2',
    disabled: false,
    name: 'title',
    placeholder: 'Title'
  },
  play: interactWithCanvas,
  render: (args) => <Input {...args} />
};
