import { ErrorMessage } from './ErrorMessage.js';
import {gothamColors} from '../../utils/colorUtils.js';
import {focusCanvas} from '../../utils/storyInteractions.js';

import type { Meta, StoryObj } from '@nlabs/lex/storybook';

const meta: Meta<typeof ErrorMessage> = {
  argTypes: {
    color: {
      control: 'select',
      options: gothamColors
    },
    message: {
      control: 'text'
    }
  },
  component: ErrorMessage
};

export default meta;
type Story = StoryObj<typeof ErrorMessage>;

export const Primary: Story = {
  args: {
    color: 'error',
    message: 'This is an error message'
  },
  play: focusCanvas
};
