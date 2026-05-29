import {RefreshCcw, ShieldCheck, Truck} from 'lucide-react';
import React from 'react';

import {IncentiveGrid} from './IncentiveGrid.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof IncentiveGrid> = {
  component: IncentiveGrid,
  parameters: {
    layout: 'padded'
  },
  title: 'Ecommerce/IncentiveGrid'
};

export default meta;

type Story = StoryObj<typeof IncentiveGrid>;

export const ThreeColumn: Story = {
  args: {
    incentives: [
      {description: 'Free shipping on domestic orders over $75.', icon: <Truck className="size-6" />, title: 'Free shipping'},
      {description: '30 day returns with prepaid labels.', icon: <RefreshCcw className="size-6" />, title: 'Easy returns'},
      {description: 'Every checkout is encrypted and protected.', icon: <ShieldCheck className="size-6" />, title: 'Secure payment'}
    ]
  }
};
