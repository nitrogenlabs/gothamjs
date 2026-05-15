import React from 'react';
import {interactWithCanvas} from '../../utils/storyInteractions.js';
import {Footer} from './Footer.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const links = [
  {href: '#docs', label: 'Docs'},
  {href: '#status', label: 'Status'},
  {href: '#privacy', label: 'Privacy'}
];

const meta: Meta<typeof Footer> = {
  argTypes: {
    brand: {
      control: 'text'
    },
    copyright: {
      control: 'text'
    },
    supportEmail: {
      control: 'text'
    },
    supportLabel: {
      control: 'text'
    }
  },
  component: Footer,
  parameters: {
    layout: 'fullscreen'
  },
  title: 'Components/Footer'
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {
    brand: 'GothamJS',
    copyright: '© 2026 Nitrogen Labs',
    links,
    supportEmail: 'support@example.com',
    supportLabel: 'Support'
  },
  play: interactWithCanvas
};
