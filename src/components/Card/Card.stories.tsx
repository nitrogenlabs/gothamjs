import React from 'react';
import {interactWithCanvas} from '../../utils/storyInteractions.js';
import {Button} from '../Button/Button.js';
import {Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from './Card.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof Card> = {
  argTypes: {
    className: {
      control: 'text'
    }
  },
  component: Card,
  parameters: {
    layout: 'centered'
  },
  title: 'Components/Card'
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    className: 'w-96'
  },
  play: interactWithCanvas,
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Release checklist</CardTitle>
        <CardDescription>Review package health before publishing.</CardDescription>
        <CardAction>
          <BadgeLabel />
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Stories, controls, and interaction coverage are ready for verification.</p>
      </CardContent>
      <CardFooter>
        <Button label="Review" size="sm" />
      </CardFooter>
    </Card>
  )
};

const BadgeLabel = () => (
  <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">Ready</span>
);
