import React from 'react';
import {gothamColors} from '../../utils/colorUtils.js';
import {focusCanvas} from '../../utils/storyInteractions.js';
import {Label} from './Label.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof Label> = {
  argTypes: {
    color: {
      control: 'select',
      options: gothamColors
    },
    hasError: {
      control: 'boolean'
    },
    label: {
      control: 'text'
    },
    name: {
      control: 'text'
    }
  },
  component: Label,
  parameters: {
    layout: 'centered'
  },
  title: 'Components/Label'
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    color: 'neutral',
    hasError: false,
    label: 'Email address',
    name: 'email'
  },
  play: focusCanvas
};
