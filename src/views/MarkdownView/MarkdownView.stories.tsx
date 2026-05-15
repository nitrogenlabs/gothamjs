import { MarkdownView } from './MarkdownView.js';
import {focusCanvas} from '../../utils/storyInteractions.js';

import type { Meta, StoryObj } from '@nlabs/lex/storybook';


const meta: Meta<typeof MarkdownView> = {
  argTypes: {
    className: {
      control: 'text'
    },
    content: {
      control: 'text'
    }
  },
  component: MarkdownView
};

export default meta;
type Story = StoryObj<typeof MarkdownView>;

export const Primary: Story = {
  args: {
    className: 'test',
    content: '# Hello\n**Bold text**\n*Italic text*\n- List item'
  },
  play: focusCanvas
};
