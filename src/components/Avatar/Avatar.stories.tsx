import React from 'react';
import {interactWithCanvas} from '../../utils/storyInteractions.js';
import {Avatar, AvatarBadge, AvatarButton, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage} from './Avatar.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';
import type {ComponentProps} from 'react';

const meta: Meta<typeof Avatar> = {
  argTypes: {
    alt: {
      control: 'text'
    },
    initials: {
      control: 'text'
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg']
    },
    square: {
      control: 'boolean'
    },
    src: {
      control: 'text'
    }
  },
  component: Avatar,
  parameters: {
    layout: 'centered'
  },
  title: 'Components/Avatar'
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    alt: 'Bruce Wayne',
    initials: 'BW',
    size: 'default',
    square: false
  },
  play: interactWithCanvas
};

export const WithImage: Story = {
  args: {
    alt: 'Selina Kyle',
    initials: 'SK',
    size: 'lg',
    square: false,
    src: 'https://i.pravatar.cc/160?img=47'
  },
  play: interactWithCanvas
};

export const WithBadge: Story = {
  args: {
    alt: 'Selina Kyle',
    initials: 'SK',
    size: 'lg'
  },
  play: interactWithCanvas,
  render: (args: ComponentProps<typeof Avatar>) => (
    <Avatar {...args}>
      {args.src ? <AvatarImage alt={args.alt} src={args.src} /> : <AvatarFallback>{args.initials}</AvatarFallback>}
      <AvatarBadge />
    </Avatar>
  )
};

export const Group: Story = {
  play: interactWithCanvas,
  render: () => (
    <AvatarGroup>
      <Avatar initials="BW" />
      <Avatar initials="SK" />
      <Avatar initials="DG" />
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  )
};

export const Button: Story = {
  args: {
    alt: 'Open profile',
    initials: 'OP',
    size: 'default'
  },
  play: interactWithCanvas,
  render: (args: ComponentProps<typeof Avatar>) => <AvatarButton {...(args as any)} />
};
