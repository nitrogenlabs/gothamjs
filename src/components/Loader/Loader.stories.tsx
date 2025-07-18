import { Loader } from './Loader';

import type { Meta, StoryObj } from '@storybook/react-webpack5';


const meta: Meta<typeof Loader> = {
  component: Loader
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Primary: Story = {
  args: {
    content: 'Loading...'
  }
};