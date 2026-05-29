import {interactWithCanvas} from '../../utils/storyInteractions.js';
import {Tabs} from './Tabs.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const items = [
  {id: 'account', label: 'Account'},
  {id: 'company', label: 'Company'},
  {current: true, id: 'team', label: 'Team'},
  {id: 'billing', label: 'Billing'}
];

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  parameters: {
    layout: 'padded'
  },
  title: 'Application UI/Navigation/Tabs'
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Underline: Story = {
  args: {
    items,
    variant: 'underline'
  },
  play: interactWithCanvas
};

export const Pills: Story = {
  args: {
    items,
    variant: 'pills'
  },
  play: interactWithCanvas
};
