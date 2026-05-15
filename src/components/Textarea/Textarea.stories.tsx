import React from 'react';
import {interactWithCanvas} from '../../utils/storyInteractions.js';
import {Textarea} from './Textarea.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof Textarea> = {
  argTypes: {
    disabled: {
      control: 'boolean'
    },
    placeholder: {
      control: 'text'
    },
    rows: {
      control: 'number'
    }
  },
  component: Textarea,
  parameters: {
    layout: 'centered'
  },
  title: 'Components/Textarea'
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    disabled: false,
    placeholder: 'Write a release note',
    rows: 4
  },
  play: interactWithCanvas
};
