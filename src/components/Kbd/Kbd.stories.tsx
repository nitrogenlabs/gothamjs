import React from 'react';
import {focusCanvas} from '../../utils/storyInteractions.js';
import {Kbd} from './Kbd.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof Kbd> = {
  argTypes: {
    children: {
      control: 'text'
    }
  },
  component: Kbd,
  parameters: {
    layout: 'centered'
  },
  title: 'Components/Kbd'
};

export default meta;

type Story = StoryObj<typeof Kbd>;

export const Default: Story = {
  args: {
    children: '⌘ K'
  },
  play: focusCanvas
};
