import { Svg as SvgComponent } from './Svg.js';
import {gothamColors} from '../../utils/colorUtils.js';
import {focusCanvas} from '../../utils/storyInteractions.js';

import type { Meta, StoryObj } from '@nlabs/lex/storybook';

const meta: Meta<typeof SvgComponent> = {
  argTypes: {
    color: {
      control: 'select',
      options: gothamColors
    },
    height: {
      control: 'number'
    },
    name: {
      control: 'text'
    },
    width: {
      control: 'number'
    }
  },
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
  },
  play: focusCanvas
};
