import { ErrorMessage } from './ErrorMessage.js';

import type { Meta, StoryObj } from '@nlabs/lex/storybook';

const meta: Meta<typeof ErrorMessage> = {
  component: ErrorMessage
};

export default meta;
type Story = StoryObj<typeof ErrorMessage>;

export const Primary: Story = {
  args: {
    message: 'This is an error message'
  }
};