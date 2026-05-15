import React from 'react';
import {interactWithCanvas} from '../../utils/storyInteractions.js';
import {DatePicker} from './DatePicker.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const today = new Date(2026, 4, 14).getTime();

const meta: Meta<typeof DatePicker> = {
  argTypes: {
    initialDate: {
      control: 'date'
    },
    maxDate: {
      control: 'date'
    },
    minDate: {
      control: 'date'
    }
  },
  component: DatePicker,
  parameters: {
    layout: 'centered'
  },
  title: 'Components/DatePicker'
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    initialDate: today,
    maxDate: new Date(2026, 11, 31).getTime(),
    minDate: new Date(2026, 0, 1).getTime()
  },
  play: interactWithCanvas
};
