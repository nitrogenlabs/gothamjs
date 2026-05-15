import React from 'react';
import {focusCanvas} from '../../utils/storyInteractions.js';
import {Separator} from './Separator.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof Separator> = {
  argTypes: {
    decorative: {
      control: 'boolean'
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical']
    }
  },
  component: Separator,
  parameters: {
    layout: 'centered'
  },
  title: 'Components/Separator'
};

export default meta;

type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  args: {
    decorative: false,
    orientation: 'horizontal'
  },
  play: focusCanvas,
  render: (args) => (
    <div className="w-80 space-y-3">
      <p className="text-sm">Section above</p>
      <Separator {...args} />
      <p className="text-sm">Section below</p>
    </div>
  )
};

export const Vertical: Story = {
  args: {
    decorative: false,
    orientation: 'vertical'
  },
  play: focusCanvas,
  render: (args) => (
    <div className="flex h-16 items-center gap-4">
      <span>Left</span>
      <Separator {...args} />
      <span>Right</span>
    </div>
  )
};
