import React from 'react';
import {FileText} from 'lucide-react';
import {interactWithCanvas} from '../../utils/storyInteractions.js';
import {Button} from '../Button/Button.js';
import {Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemGroup, ItemHeader, ItemMedia, ItemSeparator, ItemTitle} from './Item.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof Item> = {
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'sm']
    },
    variant: {
      control: 'select',
      options: ['default', 'outline', 'muted']
    }
  },
  component: Item,
  parameters: {
    layout: 'centered'
  },
  title: 'Components/Item'
};

export default meta;

type Story = StoryObj<typeof Item>;

export const Default: Story = {
  args: {
    size: 'default',
    variant: 'outline'
  },
  play: interactWithCanvas,
  render: (args) => (
    <ItemGroup className="w-[32rem]">
      <Item {...args}>
        <ItemMedia variant="icon">
          <FileText />
        </ItemMedia>
        <ItemContent>
          <ItemHeader>
            <ItemTitle>Component coverage</ItemTitle>
            <ItemActions>
              <Button label="Open" size="sm" variant="outlined" />
            </ItemActions>
          </ItemHeader>
          <ItemDescription>Stories include controls and a play interaction for regression checks.</ItemDescription>
          <ItemFooter>
            <span>Updated today</span>
          </ItemFooter>
        </ItemContent>
      </Item>
      <ItemSeparator />
      <Item variant="muted">
        <ItemContent>
          <ItemTitle>Follow-up review</ItemTitle>
          <ItemDescription>Run Storybook after changing component props.</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  )
};
