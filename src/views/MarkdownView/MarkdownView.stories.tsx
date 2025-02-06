import type { Meta, StoryObj } from '@storybook/react';

import { MarkdownView } from './MarkdownView';

const meta: Meta<typeof MarkdownView> = {
  component: MarkdownView,
};

export default meta;
type Story = StoryObj<typeof MarkdownView>;

export const Primary: Story = {
  args: {
    content: '# Hello\n**Bold text**\n*Italic text*\n- List item',
    className: 'test',
  },
};