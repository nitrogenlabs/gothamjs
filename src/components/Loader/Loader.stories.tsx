import type { Meta, StoryObj } from '@storybook/react';

import { Loader } from './Loader';

const meta: Meta<typeof Loader> = {
  component: Loader,
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Primary: Story = {
  args: {
    content: 'Loading...',
    full: true
  },
};