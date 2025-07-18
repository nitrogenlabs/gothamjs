import { ErrorMessage } from './ErrorMessage';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

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