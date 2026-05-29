import React from 'react';
import {interactWithCanvas} from '../../utils/storyInteractions.js';
import {Heading, Subheading} from './Heading.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof Heading> = {
  argTypes: {
    children: {
      control: 'text'
    },
    level: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6]
    }
  },
  component: Heading,
  parameters: {
    layout: 'centered'
  },
  title: 'Components/Heading'
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    children: 'Workspace overview',
    level: 1
  },
  play: interactWithCanvas
};

export const WithSubheading: Story = {
  play: interactWithCanvas,
  render: () => (
    <div className="space-y-2">
      <Heading>Workspace overview</Heading>
      <Subheading>Activity summary</Subheading>
    </div>
  )
};
