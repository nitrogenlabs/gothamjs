import React from 'react';

import {interactWithCanvas} from '../../utils/storyInteractions.js';
import {InputField} from '../InputField/InputField.js';
import {Field, FieldDescription, FieldGroup, FieldLabel, Fieldset, Legend} from './Fieldset.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof Fieldset> = {
  component: Fieldset,
  parameters: {
    layout: 'centered'
  },
  title: 'Components/Form/Fieldset'
};

export default meta;

type Story = StoryObj<typeof Fieldset>;

export const Default: Story = {
  play: interactWithCanvas,
  render: () => (
    <Fieldset className="w-96">
      <Legend>Profile</Legend>
      <FieldGroup>
        <Field>
          <FieldLabel>Name</FieldLabel>
          <FieldDescription>Shown on your public profile.</FieldDescription>
          <InputField name="name" placeholder="Bruce Wayne" />
        </Field>
      </FieldGroup>
    </Fieldset>
  )
};
