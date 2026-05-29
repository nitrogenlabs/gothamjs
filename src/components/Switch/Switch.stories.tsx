import React from 'react';

import {interactWithCanvas} from '../../utils/storyInteractions.js';
import {FieldDescription, FieldLabel} from '../Fieldset/Fieldset.js';
import {Switch, SwitchField, SwitchGroup} from './Switch.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof Switch> = {
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'link', 'neutral', 'error', 'warning', 'success', 'info']
    },
    defaultChecked: {
      control: 'boolean'
    }
  },
  component: Switch,
  parameters: {
    layout: 'centered'
  },
  title: 'Components/Form/Switch'
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    'aria-label': 'Enable notifications',
    color: 'primary',
    defaultChecked: true
  },
  play: interactWithCanvas
};

export const WithField: Story = {
  play: interactWithCanvas,
  render: () => (
    <SwitchGroup className="w-96">
      <SwitchField>
        <FieldLabel>Email notifications</FieldLabel>
        <FieldDescription>Receive project activity summaries.</FieldDescription>
        <Switch defaultChecked name="emailNotifications" />
      </SwitchField>
    </SwitchGroup>
  )
};
