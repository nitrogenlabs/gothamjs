import {MarkdownView} from '../../index.js';
import {focusCanvas} from '../../utils/storyInteractions.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';


const meta: Meta<typeof MarkdownView> = {
  argTypes: {
    className: {
      control: 'text'
    },
    content: {
      control: 'text'
    }
  },
  component: MarkdownView,
  parameters: {
    docs: {
      description: {
        component: 'Renders inline or remote Markdown content with optional template values. Publicly import it from `@nlabs/gothamjs` or `@nlabs/gothamjs/views`.'
      }
    }
  },
  tags: ['autodocs'],
  title: 'Views/MarkdownView'
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
