import React from 'react';
import {Search} from 'lucide-react';
import {interactWithCanvas} from '../../utils/storyInteractions.js';
import {Button} from '../Button/Button.js';
import {Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle} from './Empty.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof Empty> = {
  argTypes: {
    className: {
      control: 'text'
    }
  },
  component: Empty,
  parameters: {
    layout: 'centered'
  },
  title: 'Components/Empty'
};

export default meta;

type Story = StoryObj<typeof Empty>;

export const Default: Story = {
  args: {
    className: 'w-[28rem]'
  },
  play: interactWithCanvas,
  render: (args) => (
    <Empty {...args}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Search />
        </EmptyMedia>
        <EmptyTitle>No results</EmptyTitle>
        <EmptyDescription>Try changing the filters or creating a new saved view.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button label="Create view" size="sm" />
      </EmptyContent>
    </Empty>
  )
};
