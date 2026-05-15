import React from 'react';
import {BookOpen, Rss} from 'lucide-react';
import {interactWithCanvas} from '../../utils/storyInteractions.js';
import {NotFound} from './NotFound.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const links = [
  {description: 'Browse component usage and controls.', href: '#docs', icon: BookOpen, label: 'Documentation'},
  {description: 'Check the current package status.', href: '#status', label: 'Status'}
];

const meta: Meta<typeof NotFound> = {
  argTypes: {
    description: {
      control: 'text'
    },
    homeHref: {
      control: 'text'
    },
    homeLabel: {
      control: 'text'
    },
    statusCode: {
      control: 'text'
    },
    supportHref: {
      control: 'text'
    },
    supportLabel: {
      control: 'text'
    },
    title: {
      control: 'text'
    },
    variant: {
      control: 'select',
      options: ['simple', 'popular', 'split', 'background']
    }
  },
  component: NotFound,
  parameters: {
    layout: 'fullscreen'
  },
  title: 'Components/NotFound'
};

export default meta;

type Story = StoryObj<typeof NotFound>;

export const Default: Story = {
  args: {
    description: 'The page you requested could not be found.',
    homeHref: '#home',
    homeLabel: 'Go back home',
    links,
    socialLinks: [{href: '#updates', icon: Rss, label: 'Updates'}],
    statusCode: '404',
    supportHref: '#support',
    supportLabel: 'Contact support',
    title: 'Page not found',
    variant: 'popular'
  },
  play: interactWithCanvas
};
