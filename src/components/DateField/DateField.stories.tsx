import {FormProvider, useForm} from 'react-hook-form';

import {DateField} from './DateField';
import {gothamColors} from '../../utils/colorUtils';

import type {Meta, StoryObj} from '@storybook/react-webpack5';

const meta: Meta<typeof DateField> = {
  argTypes: {
    color: {
      control: 'select',
      defaultValue: 'primary',
      description: 'The color of the date field',
      options: gothamColors
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
      description: 'Whether the date field is disabled'
    },
    error: {
      control: 'boolean',
      defaultValue: false,
      description: 'Whether the date field has an error'
    },
    errorColor: {
      control: 'select',
      defaultValue: 'error',
      description: 'The color of the error state',
      options: gothamColors
    },
    label: {
      control: 'text',
      description: 'The label text for the date field'
    },
    maxDate: {
      control: 'date',
      description: 'The maximum allowed date'
    },
    minDate: {
      control: 'date',
      description: 'The minimum allowed date'
    }
  },
  component: DateField,
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
  title: 'Components/DateField'
};

export default meta;
type Story = StoryObj<typeof DateField>;

export const Default: Story = {
  args: {
    color: 'primary',
    disabled: false,
    error: false,
    label: 'Select Date',
    name: 'date',
    required: true
  }
};

export const WithDefaultValue: Story = {
  args: {
    color: 'primary',
    defaultValue: new Date().getTime(),
    disabled: false,
    error: false,
    label: 'Date with Default Value',
    name: 'dateWithDefault'
  }
};

export const WithDateRange: Story = {
  args: {
    color: 'primary',
    disabled: false,
    error: false,
    label: 'Date with Range',
    maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).getTime(),
    minDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).getTime(),
    name: 'dateWithRange'
  }
};

export const WithError: Story = {
  args: {
    color: 'primary',
    disabled: false,
    error: true,
    errorColor: 'error',
    label: 'Date with Error',
    name: 'dateWithError'
  }
};

export const Disabled: Story = {
  args: {
    color: 'primary',
    defaultValue: new Date().getTime(),
    disabled: true,
    error: false,
    label: 'Disabled Date Field',
    name: 'disabledDate'
  }
};