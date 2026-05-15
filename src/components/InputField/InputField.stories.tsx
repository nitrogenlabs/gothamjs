import React from 'react';
import {gothamColors} from '../../utils/colorUtils.js';
import {interactWithCanvas} from '../../utils/storyInteractions.js';
import {InputField} from './InputField.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof InputField> = {
  argTypes: {
    borderColor: {
      control: 'select',
      options: gothamColors
    },
    borderType: {
      control: 'select',
      options: ['solid', 'rounded', 'none', 'underline']
    },
    disabled: {
      control: 'boolean'
    },
    multiline: {
      control: 'boolean'
    },
    placeholder: {
      control: 'text'
    },
    placeholderColor: {
      control: 'select',
      options: gothamColors
    },
    textColor: {
      control: 'select',
      options: gothamColors
    }
  },
  component: InputField,
  parameters: {
    layout: 'centered'
  },
  title: 'Components/InputField'
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    borderColor: 'primary',
    borderType: 'rounded',
    disabled: false,
    multiline: false,
    placeholder: 'Component name',
    placeholderColor: 'neutral',
    textColor: 'neutral'
  },
  play: interactWithCanvas
};
