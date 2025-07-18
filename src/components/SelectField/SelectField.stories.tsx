import {FormProvider, useForm} from 'react-hook-form';

import {SelectField} from './SelectField.js';
import {gothamColors} from '../../utils/colorUtils.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';


const meta: Meta<typeof SelectField> = {
  argTypes: {
    color: {
      control: 'select',
      description: 'The color of the select field',
      options: gothamColors
    },
    defaultValue: {
      control: 'text',
      description: 'The default selected value'
    },
    label: {
      control: 'text',
      description: 'The label text for the select field'
    },
    name: {
      control: 'text',
      description: 'The name of the select field'
    },
    options: {
      control: 'object',
      description: 'Array of select options'
    }
  },
  component: SelectField,
  decorators: [
    (Story) => {
      const methods = useForm();
      return (
        <FormProvider {...methods}>
          <div className="flex flex-col items-center justify-center min-h-screen w-full p-4" style={{width: '300px'}}>
            <Story />
          </div>
        </FormProvider>
      );
    }
  ],
  title: 'Components/SelectField'
};

export default meta;
type Story = StoryObj<typeof SelectField>;

const defaultOptions = [
  {
    id: 1,
    label: 'First Option',
    value: '1'
  },
  {
    id: 2,
    label: 'Second Option',
    value: '2'
  },
  {
    id: 3,
    label: 'Third Option',
    value: '3'
  }
];

export const Default: Story = {
  args: {
    label: 'Select an Option',
    name: 'selectGroup',
    options: defaultOptions
  }
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: '2',
    label: 'Select an Option',
    name: 'selectGroupWithDefault',
    options: defaultOptions
  }
};

export const WithIcons: Story = {
  args: {
    label: 'Select a Category',
    name: 'categorySelect',
    options: [
      {
        icon: 'briefcase',
        id: 1,
        label: 'Work',
        value: 'work'
      },
      {
        icon: 'user',
        id: 2,
        label: 'Personal',
        value: 'personal'
      },
      {
        icon: 'shopping-cart',
        id: 3,
        label: 'Shopping',
        value: 'shopping'
      }
    ]
  }
};

export const WithImages: Story = {
  args: {
    label: 'Select a Country',
    name: 'countrySelect',
    options: [
      {
        id: 1,
        image: 'https://flagcdn.com/w20/us.png',
        label: 'United States',
        value: 'us'
      },
      {
        id: 2,
        image: 'https://flagcdn.com/w20/gb.png',
        label: 'United Kingdom',
        value: 'gb'
      },
      {
        id: 3,
        image: 'https://flagcdn.com/w20/ca.png',
        label: 'Canada',
        value: 'ca'
      }
    ]
  }
};

export const WithLongLabels: Story = {
  args: {
    label: 'Select a Plan',
    name: 'planSelect',
    options: [
      {
        id: 1,
        label: 'Basic Plan - Perfect for individuals and small projects',
        value: 'basic'
      },
      {
        id: 2,
        label: 'Professional Plan - Ideal for growing businesses with advanced features',
        value: 'pro'
      },
      {
        id: 3,
        label: 'Enterprise Plan - Full-featured solution with dedicated support',
        value: 'enterprise'
      }
    ]
  }
};