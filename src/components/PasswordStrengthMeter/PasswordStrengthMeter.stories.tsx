import {PasswordStrengthMeter} from './PasswordStrengthMeter.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof PasswordStrengthMeter> = {
  component: PasswordStrengthMeter,
  parameters: {
    layout: 'padded'
  },
  title: 'Application UI/Forms/PasswordStrengthMeter'
};

export default meta;

type Story = StoryObj<typeof PasswordStrengthMeter>;

export const Default: Story = {
  args: {
    password: 'CorrectHorse123!'
  }
};
