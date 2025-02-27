import type { Meta, StoryObj } from '@storybook/react';

import { Gotham } from './Gotham';

const meta: Meta<typeof Gotham> = {
  component: Gotham,
};

export default meta;
type Story = StoryObj<typeof Gotham>;

export const Primary: Story = {
  args: {
    config: {
      routes: [
        {
          view: 'markdown',
          path: '/',
          props: {
            content: '# Hello\n**Bold text**\n*Italic text*\n- List item',
          }
        },
      ]
    },
  },
};