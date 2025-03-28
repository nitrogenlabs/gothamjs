import {FormProvider, useForm} from 'react-hook-form';

import {TextField} from './TextField';
import {gothamColors} from '../../utils/colorUtils';

import type {Meta, StoryObj} from '@storybook/react';

const meta: Meta<typeof TextField> = {
  argTypes: {
    borderClass: {
      control: 'text',
      description: 'The color of the border of the text field'
    },
    color: {
      control: 'select',
      defaultValue: 'neutral',
      description: 'The color of the text field',
      options: gothamColors
    },
    hasError: {
      control: 'boolean',
      defaultValue: false,
      description: 'Whether the text field has an error'
    },
    labelClass: {
      control: 'text',
      description: 'The class name of the label'
    },
    multiline: {
      control: 'boolean',
      defaultValue: false,
      description: 'Whether the text field is multiline'
    },
    pattern: {
      control: 'text',
      description: 'The pattern of the text field'
    },
    rows: {
      control: 'number',
      defaultValue: 1,
      description: 'The number of rows of the text field'
    }
  },
  component: TextField,
  decorators: [
    (Story) => {
      const methods = useForm();
      return (
        <FormProvider {...methods}>
          <div className="p-4 max-w-md">
            <Story />
          </div>
        </FormProvider>
      );
    }
  ],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        {name: 'light', value: '#ffffff'},
        {name: 'dark', value: '#1a1a1a'}
      ]
    },
    layout: 'centered'
  },
  title: 'Components/TextField'
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    disabled: false,
    error: false,
    label: 'Default TextField',
    name: 'default',
    placeholder: 'Textfield placeholder',
    required: true
  }
};

export const Multiline: Story = {
  args: {
    disabled: false,
    error: false,
    label: 'Default TextField',
    multiline: true,
    name: 'default',
    placeholder: 'Description',
    required: true,
    rows: 1
  }
};

export const WithPattern: Story = {
  args: {
    disabled: false,
    label: 'Email TextField',
    name: 'email',
    pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$',
    placeholder: 'Enter email address'
  }
};