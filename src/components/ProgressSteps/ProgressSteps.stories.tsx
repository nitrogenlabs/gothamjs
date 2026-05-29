import {ProgressSteps} from './ProgressSteps.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof ProgressSteps> = {
  component: ProgressSteps,
  parameters: {
    layout: 'padded'
  },
  title: 'Application UI/Navigation/ProgressSteps'
};

export default meta;

type Story = StoryObj<typeof ProgressSteps>;

export const Default: Story = {
  args: {
    steps: [
      {href: '#', id: 'Step 1', label: 'Job details', status: 'complete'},
      {href: '#', id: 'Step 2', label: 'Application form', status: 'current'},
      {href: '#', id: 'Step 3', label: 'Preview', status: 'upcoming'}
    ]
  }
};
