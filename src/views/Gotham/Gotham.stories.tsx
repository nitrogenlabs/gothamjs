import {Gotham} from './Gotham.js';
import {Markdown} from '../../components/Markdown/Markdown.js';
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
          element: <Markdown />,
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
