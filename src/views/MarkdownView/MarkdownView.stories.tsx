import { MarkdownView } from './MarkdownView.js';

import type { Meta, StoryObj } from '@nlabs/lex/storybook';


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