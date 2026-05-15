import {Plus} from 'lucide-react';

import {EmptyState as EmptyStateComponent} from './EmptyState.js';
import {interactWithCanvas} from '../../utils/storyInteractions.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof EmptyStateComponent> = {
  argTypes: {
    actionLabel: {
      control: 'text'
    },
    description: {
      control: 'text'
    },
    title: {
      control: 'text'
    }
  },
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
  },
  play: interactWithCanvas
};
