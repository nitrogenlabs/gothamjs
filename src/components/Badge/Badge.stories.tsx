import React from 'react';
import {interactWithCanvas} from '../../utils/storyInteractions.js';
import {Badge} from './Badge.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof Badge> = {
  argTypes: {
    as: {
      control: 'select',
      options: ['span', 'a', 'button']
    },
    children: {
      control: 'text'
    },
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link']
    }
  },
  component: Badge,
  parameters: {
    layout: 'centered'
  },
  title: 'Components/Badge'
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Stable',
    variant: 'default'
  },
  play: interactWithCanvas
};

export const Link: Story = {
  args: {
    as: 'a',
    children: 'Read docs',
    href: '#',
    variant: 'link'
  } as never,
  play: interactWithCanvas
};
