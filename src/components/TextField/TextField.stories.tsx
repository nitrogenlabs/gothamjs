import {FormProvider, useForm} from 'react-hook-form';

import {TextField} from './TextField';
import {gothamColors} from '../../utils/colorUtils';

import type {Meta, StoryObj} from '@storybook/react';

const meta: Meta<typeof TextField> = {
  argTypes: {
    borderColor: {
      control: 'select',
      defaultValue: 'secondary',
      description: 'The color of the border',
      options: gothamColors
    },
    borderType: {
      control: 'select',
      defaultValue: 'underline',
      description: 'The type of border of the text field',
      options: ['solid', 'rounded', 'none', 'underline']
    },
    hasError: {
      control: 'boolean',
      defaultValue: false,
      description: 'Whether the text field has an error'
    },
    labelColor: {
      control: 'select',
      defaultValue: 'white',
      description: 'The color of the label',
      options: gothamColors
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
    placeholderColor: {
      control: 'select',
      defaultValue: 'secondary',
      description: 'The color of the placeholder',
      options: gothamColors
    },
    rows: {
      control: 'number',
      defaultValue: 1,
      description: 'The number of rows of the text field'
    },
    textColor: {
      control: 'select',
      defaultValue: 'white',
      description: 'The color of the text',
      options: gothamColors
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
    borderColor: 'secondary',
    borderType: 'underline',
    disabled: false,
    error: false,
    label: 'Default TextField',
    labelColor: 'black',
    name: 'default',
    placeholder: 'Textfield placeholder',
    placeholderColor: 'secondary',
    required: true
  }
};

export const Multiline: Story = {
  args: {
    borderColor: 'secondary',
    borderType: 'solid',
    disabled: false,
    error: false,
    label: 'Default TextField',
    labelColor: 'black',
    multiline: true,
    name: 'default',
    placeholder: 'Description',
    placeholderColor: 'secondary',
    required: true,
    rows: 1,
    textColor: 'black'
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