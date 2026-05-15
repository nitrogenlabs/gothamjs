import {Gotham} from './Gotham.js';
import {MarkdownView} from '../MarkdownView/MarkdownView.js';
import {focusCanvas} from '../../utils/storyInteractions.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';


const meta: Meta<typeof Gotham> = {
  argTypes: {
    config: {
      control: 'object'
    }
  },
  component: Gotham
};

export default meta;
type Story = StoryObj<typeof Gotham>;

export const Primary: Story = {
  args: {
    config: {
      routes: [
        {
          element: <MarkdownView />,
          path: '/',
          props: {
            content: '# Hello\n**Bold text**\n*Italic text*\n- List item'
          }
        }
      ]
    }
  },
  play: focusCanvas
};
