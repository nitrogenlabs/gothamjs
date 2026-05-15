import React from 'react';
import {interactWithCanvas} from '../../utils/storyInteractions.js';
import {Pricing} from './Pricing.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const tiers = [
  {
    ctaLabel: 'Choose starter',
    description: 'For small component libraries.',
    features: ['Story coverage', 'Basic controls', 'Smoke interactions'],
    href: '#starter',
    id: 'starter',
    name: 'Starter',
    price: {annually: '$190', monthly: '$19'}
  },
  {
    badge: 'Popular',
    ctaLabel: 'Choose growth',
    description: 'For production design systems.',
    featured: true,
    features: ['Full controls', 'Interaction tests', 'Release checks'],
    href: '#growth',
    id: 'growth',
    name: 'Growth',
    price: {annually: '$490', monthly: '$49'}
  }
];

const comparisonSections = [
  {
    features: [
      {name: 'Controls', tiers: {Growth: true, Starter: true}},
      {name: 'Interaction stories', tiers: {Growth: true, Starter: 'Basic'}}
    ],
    name: 'Storybook'
  }
];

const meta: Meta<typeof Pricing> = {
  argTypes: {
    cardStyle: {
      control: 'select',
      options: ['default', 'contrast', 'solid']
    },
    defaultFrequency: {
      control: 'select',
      options: ['monthly', 'annually']
    },
    description: {
      control: 'text'
    },
    eyebrow: {
      control: 'text'
    },
    title: {
      control: 'text'
    },
    tone: {
      control: 'select',
      options: ['default', 'dark', 'gradient']
    },
    variant: {
      control: 'select',
      options: ['grid', 'single', 'comparison']
    }
  },
  component: Pricing,
  parameters: {
    layout: 'fullscreen'
  },
  title: 'Components/Pricing'
};

export default meta;

type Story = StoryObj<typeof Pricing>;

export const Grid: Story = {
  args: {
    cardStyle: 'default',
    defaultFrequency: 'monthly',
    description: 'Pick the coverage level that fits your release workflow.',
    eyebrow: 'Pricing',
    frequencies: [
      {label: 'Monthly', priceSuffix: '/mo', value: 'monthly'},
      {label: 'Annually', priceSuffix: '/yr', value: 'annually'}
    ],
    tiers,
    title: 'Plans for every component system',
    tone: 'default',
    variant: 'grid'
  },
  play: interactWithCanvas
};

export const Comparison: Story = {
  args: {
    comparisonSections,
    tiers,
    title: 'Compare plans',
    variant: 'comparison'
  },
  play: interactWithCanvas
};
