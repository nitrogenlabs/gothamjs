import type { Meta, StoryObj } from '@storybook/react';

import { Svg } from './Svg';

const meta: Meta<typeof Svg> = {
  component: Svg,
};

export default meta;
type Story = StoryObj<typeof Svg>;

export const Primary: Story = {
  args: {
    className: 'test',
    color: 'red',
    height: 100,
    name: 'test',
    width: 100
  },
};