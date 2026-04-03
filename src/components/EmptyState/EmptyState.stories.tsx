import {Plus} from 'lucide-react';

import {EmptyState as EmptyStateComponent} from './EmptyState.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof EmptyStateComponent> = {
  component: EmptyStateComponent,
  parameters: {
    layout: 'centered'
  },
  title: 'Components/EmptyState'
};

export default meta;

type Story = StoryObj<typeof EmptyStateComponent>;

export const Default: Story = {
  args: {
    actionIcon: <Plus className="mr-1.5 -ml-0.5 size-5" />,
    actionLabel: 'New Project',
    description: 'Get started by creating a new project.',
    title: 'No projects'
  }
};
