import { Loader } from './Loader.js';
import {focusCanvas} from '../../utils/storyInteractions.js';

import type { Meta, StoryObj } from '@nlabs/lex/storybook';


const meta: Meta<typeof Loader> = {
  argTypes: {
    content: {
      control: 'text'
    }
  },
  component: Loader
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Primary: Story = {
  args: {
    content: 'Loading...'
  },
  play: focusCanvas
};
