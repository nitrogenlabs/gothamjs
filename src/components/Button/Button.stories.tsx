import {Button as ButtonComponent} from './Button';
import {gothamColors} from '../../utils/colorUtils';

import type {Meta, StoryObj} from '@storybook/react-webpack5';

const meta: Meta<typeof ButtonComponent> = {
  argTypes: {
    color: {
      control: 'select',
      options: gothamColors
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text']
    }
  },
  component: ButtonComponent,
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
  title: 'Components/Button'
};

export default meta;

type Story = StoryObj<typeof ButtonComponent>;

export const Button: Story = {
  args: {
    color: 'secondary',
    disabled: false,
    hasShadow: false,
    isLoading: false,
    label: 'Button',
    size: 'md',
    variant: 'contained'
  }
};
