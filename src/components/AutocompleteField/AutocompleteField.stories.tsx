import React from 'react';
import {interactWithCanvas} from '../../utils/storyInteractions.js';
import {AutocompleteField} from './AutocompleteField.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';
import type {ComponentProps} from 'react';

const suggestions = [
  {city: 'Gotham', country: 'USA', latitude: 40.712, location: 'Gotham City', longitude: -74.006, state: 'NJ'},
  {city: 'Metropolis', country: 'USA', latitude: 38.907, location: 'Metropolis Central', longitude: -77.037, state: 'NY'}
];

const AutocompleteStory = (args: ComponentProps<typeof AutocompleteField>) => {
  return (
    <div className="w-96">
      <AutocompleteField
        {...args}
        getList={async (value: string) => suggestions.filter((suggestion) => suggestion.location.toLowerCase().includes(value.toLowerCase()))}
      />
    </div>
  );
};

const meta: Meta<typeof AutocompleteField> = {
  argTypes: {
    defaultValue: {
      control: 'text'
    },
    label: {
      control: 'text'
    },
    name: {
      control: 'text'
    },
    placeholder: {
      control: 'text'
    }
  },
  component: AutocompleteField,
  parameters: {
    layout: 'centered'
  },
  title: 'Components/AutocompleteField'
};

export default meta;

type Story = StoryObj<typeof AutocompleteField>;

export const Default: Story = {
  args: {
    label: 'Location',
    name: 'location',
    placeholder: 'Search locations'
  },
  play: interactWithCanvas,
  render: AutocompleteStory
};
