import {FormProvider, useForm} from 'react-hook-form';

import {RadioField} from './RadioField';
import {gothamColors} from '../../utils/colorUtils';

import type {Meta, StoryObj} from '@storybook/react';

const meta: Meta<typeof RadioField> = {
  argTypes: {
    color: {
      control: 'select',
      description: 'The color of the radio group',
      options: gothamColors
    },
    defaultValue: {
      control: 'text',
      description: 'The default selected value'
    },
    label: {
      control: 'text',
      description: 'The label text for the radio group'
    },
    name: {
      control: 'text',
      description: 'The name of the radio group'
    },
    optionClass: {
      control: 'text',
      description: 'The class name for the radio options'
    },
    options: {
      control: 'object',
      description: 'Array of radio options'
    }
  },
  component: RadioField,
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
  title: 'Components/RadioField'
};

export default meta;
type Story = StoryObj<typeof RadioField>;

const defaultOptions = [
  {
    description: 'This is the first option description',
    id: 'option1',
    label: 'First Option',
    value: '1'
  },
  {
    description: 'This is the second option description',
    id: 'option2',
    label: 'Second Option',
    value: '2'
  },
  {
    description: 'This is the third option description',
    id: 'option3',
    label: 'Third Option',
    value: '3'
  }
];


export const Default: Story = {
  args: {
    label: 'Choose a Color',
    name: 'colorSelection',
    options: [
      {
        id: 'red',
        label: 'Red',
        value: 'red'
      },
      {
        id: 'blue',
        label: 'Blue',
        value: 'blue'
      },
      {
        id: 'green',
        label: 'Green',
        value: 'green'
      }
    ]
  }
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: '2',
    label: 'Select an Option',
    name: 'radioGroupWithDefault',
    options: defaultOptions
  }
};

export const WithLongDescriptions: Story = {
  args: {
    label: 'Select a Plan',
    name: 'planSelection',
    options: [
      {
        description: 'Perfect for individuals and small projects. Includes basic features and support.',
        id: 'basic',
        label: 'Basic Plan',
        value: 'basic'
      },
      {
        description: 'Ideal for growing businesses. Includes advanced features, priority support, and team collaboration tools.',
        id: 'pro',
        label: 'Professional Plan',
        value: 'pro'
      },
      {
        description: 'Enterprise-grade solution with all features, dedicated support, and custom integrations.',
        id: 'enterprise',
        label: 'Enterprise Plan',
        value: 'enterprise'
      }
    ]
  }
};
