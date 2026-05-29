import {focusCanvas} from '../../utils/storyInteractions.js';
import {Loader} from './Loader.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';


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
  component: Loader,
  parameters: {
    layout: 'centered'
  },
  title: 'Components/Loader'
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
  args: {
    color: 'primary',
    size: 'sm'
  },
  play: focusCanvas,
  render: () => (
    <div className="flex items-center gap-6">
      <Loader size="sm" />
      <Loader size="md" />
      <Loader size="lg" />
    </div>
  )
};

export const Colors: Story = {
  play: focusCanvas,
  render: () => (
    <div className="flex items-center gap-6">
      <Loader color="primary" />
      <Loader color="success" />
      <Loader color="warning" />
      <Loader color="error" />
      <Loader color="neutral" />
    </div>
  )
};
