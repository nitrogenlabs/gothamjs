import React from 'react';
import {focusCanvas} from '../../utils/storyInteractions.js';
import {Skeleton} from './Skeleton.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof Skeleton> = {
  argTypes: {
    className: {
      control: 'text'
    }
  },
  component: Skeleton,
  parameters: {
    layout: 'centered'
  },
  title: 'Components/Skeleton'
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    className: 'h-24 w-80'
  },
  play: focusCanvas
};
