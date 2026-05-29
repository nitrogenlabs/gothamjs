import React from 'react';
import {interactWithCanvas} from '../../utils/storyInteractions.js';
import {Link} from './Link.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof Link> = {
  argTypes: {
    children: {
      control: 'text'
    },
    href: {
      control: 'text'
    }
  },
  component: Link,
  parameters: {
    layout: 'centered'
  },
  title: 'Components/Link'
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    children: 'Read the docs',
    href: '#'
  },
  play: interactWithCanvas
};
