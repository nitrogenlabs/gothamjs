import {interactWithCanvas} from '../../utils/storyInteractions.js';
import {PaymentMethodPanel} from './PaymentMethodPanel.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const noop = () => undefined;

const meta: Meta<typeof PaymentMethodPanel> = {
  argTypes: {
    actionIcon: {
      control: false
    },
    addLabel: {
      control: 'text'
    },
    brand: {
      control: 'text'
    },
    description: {
      control: 'text'
    },
    emptyDescription: {
      control: 'text'
    },
    emptyTitle: {
      control: 'text'
    },
    isAdding: {
      control: 'boolean'
    },
    isRemoving: {
      control: 'boolean'
    },
    last4: {
      control: 'text'
    },
    onAdd: {
      control: false
    },
    onRemove: {
      control: false
    },
    removeLabel: {
      control: 'text'
    },
    replaceLabel: {
      control: 'text'
    },
    title: {
      control: 'text'
    }
  },
  args: {
    className: 'w-full max-w-2xl',
    onAdd: noop
  },
  component: PaymentMethodPanel,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  title: 'Application UI/Commerce/PaymentMethodPanel'
};

export default meta;

type Story = StoryObj<typeof PaymentMethodPanel>;

export const Empty: Story = {
  play: interactWithCanvas
};

export const Saved: Story = {
  args: {
    brand: 'Visa',
    last4: '4242',
    onRemove: noop
  },
  play: interactWithCanvas
};

export const Adding: Story = {
  args: {
    isAdding: true
  }
};

export const Removing: Story = {
  args: {
    brand: 'Mastercard',
    isRemoving: true,
    last4: '4444',
    onRemove: noop
  }
};
