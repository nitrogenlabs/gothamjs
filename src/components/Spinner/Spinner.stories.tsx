import React from 'react';
import {focusCanvas} from '../../utils/storyInteractions.js';
import {Spinner} from './Spinner.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof Spinner> = {
  argTypes: {
    className: {
      control: 'text'
    },
    size: {
      control: 'number'
    }
  },
  component: Spinner,
  parameters: {
    layout: 'centered'
  },
  title: 'Components/Spinner'
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    className: 'text-primary',
    size: 32
  },
  play: focusCanvas
};
