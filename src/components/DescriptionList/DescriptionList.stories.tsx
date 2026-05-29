import React from 'react';
import {interactWithCanvas} from '../../utils/storyInteractions.js';
import {DescriptionDetails, DescriptionList, DescriptionTerm} from './DescriptionList.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof DescriptionList> = {
  component: DescriptionList,
  parameters: {
    layout: 'centered'
  },
  title: 'Components/DescriptionList'
};

export default meta;

type Story = StoryObj<typeof DescriptionList>;

export const Default: Story = {
  play: interactWithCanvas,
  render: () => (
    <DescriptionList className="w-96">
      <DescriptionTerm>Status</DescriptionTerm>
      <DescriptionDetails>Active</DescriptionDetails>
      <DescriptionTerm>Owner</DescriptionTerm>
      <DescriptionDetails>Nitrogen Labs</DescriptionDetails>
    </DescriptionList>
  )
};
