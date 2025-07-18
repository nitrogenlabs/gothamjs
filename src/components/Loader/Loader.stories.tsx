import { Loader } from './Loader.js';

import type { Meta, StoryObj } from '@nlabs/lex/storybook';


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