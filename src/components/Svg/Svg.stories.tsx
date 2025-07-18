import { Svg as SvgComponent } from './Svg';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta: Meta<typeof SvgComponent> = {
  component: SvgComponent
};

export default meta;
type Story = StoryObj<typeof SvgComponent>;

export const Svg: Story = {
  args: {
    className: 'test',
    color: 'error',
    height: 100,
    name: 'test',
    width: 100
  }
};