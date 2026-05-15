import React from 'react';
import {interactWithCanvas} from '../../utils/storyInteractions.js';
import {DropUpload} from './DropUpload.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof DropUpload> = {
  argTypes: {
    accept: {
      control: 'text'
    },
    disabled: {
      control: 'boolean'
    },
    helperText: {
      control: 'text'
    },
    label: {
      control: 'text'
    },
    maxFiles: {
      control: 'number'
    },
    multiple: {
      control: 'boolean'
    },
    showPreviews: {
      control: 'boolean'
    }
  },
  component: DropUpload,
  parameters: {
    layout: 'centered'
  },
  title: 'Components/DropUpload'
};

export default meta;

type Story = StoryObj<typeof DropUpload>;

export const Default: Story = {
  args: {
    accept: 'image/*,.pdf',
    helperText: 'PNG, JPG, or PDF up to 5 MB',
    label: 'Drop assets here or',
    maxFiles: 3,
    multiple: true,
    showPreviews: false,
    transformImages: false
  },
  play: interactWithCanvas
};
