import React from 'react';

import {interactWithCanvas} from '../../utils/storyInteractions.js';
import {Button} from '../Button/Button.js';
import {TextField} from '../TextField/TextField.js';
import {Form} from './Form.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof Form> = {
  argTypes: {
    disabled: {
      control: 'boolean'
    },
    mode: {
      control: 'select',
      options: ['onSubmit', 'onBlur', 'onChange', 'onTouched', 'all']
    },
    name: {
      control: 'text'
    },
    showErrors: {
      control: 'boolean'
    }
  },
  component: Form,
  parameters: {
    layout: 'centered'
  },
  title: 'Components/Form/Form'
};

export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {
  args: {
    defaultValues: {
      email: ''
    },
    disabled: false,
    mode: 'onBlur',
    name: 'storybook',
    showErrors: false
  },
  play: interactWithCanvas,
  render: (args) => (
    <Form
      {...args}
      className="flex w-80 flex-col gap-3"
      onSubmit={() => undefined}
    >
      <TextField borderType="rounded" name="email" placeholder="Email address" />
      <Button label="Submit" type="submit" />
    </Form>
  )
};
