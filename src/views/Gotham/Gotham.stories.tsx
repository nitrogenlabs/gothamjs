import { Gotham } from './Gotham';

import type { Meta, StoryObj } from '@storybook/react';


const meta: Meta<typeof Gotham> = {
  component: Gotham
};

export default meta;
type Story = StoryObj<typeof Gotham>;

export const Primary: Story = {
  args: {
    config: {
      routes: [
        {
          path: '/',
          props: {
            content: '# Hello\n**Bold text**\n*Italic text*\n- List item'
          },
          view: 'markdown'
        }
      ]
    }
  }
};