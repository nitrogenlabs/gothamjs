import { Loader } from './Loader.js';
import {focusCanvas} from '../../utils/storyInteractions.js';

import type { Meta, StoryObj } from '@nlabs/lex/storybook';


const meta: Meta<typeof Loader> = {
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'link', 'neutral', 'white', 'black', 'error', 'warning', 'success', 'info']
    },
    content: {
      control: 'text'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    }
  },
  component: Loader
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Primary: Story = {
  args: {
    color: 'primary',
    content: 'Loading...',
    size: 'md'
  },
  play: focusCanvas
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Loader size="sm" />
      <Loader size="md" />
      <Loader size="lg" />
    </div>
  ),
  play: focusCanvas
};

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Loader color="primary" />
      <Loader color="success" />
      <Loader color="warning" />
      <Loader color="error" />
      <Loader color="neutral" />
    </div>
  ),
  play: focusCanvas
};
