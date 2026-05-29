import React from 'react';

import {interactWithCanvas} from '../../utils/storyInteractions.js';
import {Container} from './Container.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof Container> = {
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full']
    }
  },
  component: Container,
  parameters: {
    layout: 'fullscreen'
  },
  title: 'Application UI/Layout/Container'
};

export default meta;

type Story = StoryObj<typeof Container>;

export const Default: Story = {
  args: {
    children: <div className="rounded-md border border-border bg-card p-6 text-card-foreground">Constrained content</div>,
    size: 'xl'
  },
  play: interactWithCanvas
};
