import type {Meta, StoryObj} from '@storybook/react';

import {Button} from './Button';

const meta = {
  title: 'Form/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  }
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
    variant: 'contained'
  }
};

export const Secondary: Story = {
  args: {
    label: 'Button'
  }
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button'
  }
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button'
  }
};
