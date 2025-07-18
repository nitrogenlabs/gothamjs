import { MarkdownView } from './MarkdownView';

import type { Meta, StoryObj } from '@storybook/react-webpack5';


const meta: Meta<typeof MarkdownView> = {
  component: MarkdownView
};

export default meta;
type Story = StoryObj<typeof MarkdownView>;

export const Primary: Story = {
  args: {
    className: 'test',
    content: '# Hello\n**Bold text**\n*Italic text*\n- List item'
  }
};