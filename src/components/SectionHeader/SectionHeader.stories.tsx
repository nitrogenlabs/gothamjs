import React from 'react';

import {interactWithCanvas} from '../../utils/storyInteractions.js';
import {Button} from '../Button/Button.js';
import {SectionHeader} from './SectionHeader.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof SectionHeader> = {
  component: SectionHeader,
  parameters: {
    layout: 'padded'
  },
  title: 'Marketing/Sections/SectionHeader'
};

export default meta;

type Story = StoryObj<typeof SectionHeader>;

export const Default: Story = {
  args: {
    eyebrow: 'Deploy faster',
    subtitle: 'Composable section headers for marketing and application surfaces.',
    title: 'Everything you need to ship'
  },
  play: interactWithCanvas
};

export const WithAction: Story = {
  play: interactWithCanvas,
  render: () => (
    <SectionHeader
      actions={<Button label="View all" size="sm" variant="outlined" />}
      subtitle="A compact page heading with a trailing action."
      title="Recent activity"
    />
  )
};
