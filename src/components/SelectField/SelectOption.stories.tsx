import React from 'react';
import {Listbox} from '@headlessui/react';
import {interactWithCanvas} from '../../utils/storyInteractions.js';
import {SelectOption} from './SelectOption.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof SelectOption> = {
  argTypes: {
    option: {
      control: 'object'
    }
  },
  component: SelectOption,
  parameters: {
    layout: 'centered'
  },
  title: 'Components/SelectOption'
};

export default meta;

type Story = StoryObj<typeof SelectOption>;

export const Default: Story = {
  args: {
    option: {
      id: 'docs',
      label: 'Documentation',
      value: 'docs'
    }
  },
  play: interactWithCanvas,
  render: (args) => (
    <Listbox value={args.option}>
      <Listbox.Options static className="w-64 rounded-md border bg-white p-1 shadow">
        <SelectOption {...args} />
      </Listbox.Options>
    </Listbox>
  )
};
