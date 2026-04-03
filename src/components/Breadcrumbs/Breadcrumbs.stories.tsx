import {Breadcrumbs as BreadcrumbsComponent} from './Breadcrumbs.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof BreadcrumbsComponent> = {
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'full', 'chevrons']
    }
  },
  component: BreadcrumbsComponent,
  parameters: {
    layout: 'centered'
  },
  title: 'Components/Breadcrumbs'
};

export default meta;

type Story = StoryObj<typeof BreadcrumbsComponent>;

export const Contained: Story = {
  args: {
    homeHref: '#',
    items: [
      {href: '#', label: 'Projects'},
      {current: true, href: '#', label: 'Project Nero'}
    ],
    variant: 'contained'
  },
  render: (args) => (
    <div className="w-full max-w-4xl p-6">
      <BreadcrumbsComponent {...args} />
    </div>
  )
};

export const Full: Story = {
  args: {
    homeHref: '#',
    items: [
      {href: '#', label: 'Projects'},
      {current: true, href: '#', label: 'Project Nero'}
    ],
    variant: 'full'
  },
  render: (args) => (
    <div className="w-full max-w-6xl p-6">
      <BreadcrumbsComponent {...args} />
    </div>
  )
};

export const Chevrons: Story = {
  args: {
    homeHref: '#',
    items: [
      {href: '#', label: 'Projects'},
      {current: true, href: '#', label: 'Project Nero'}
    ],
    variant: 'chevrons'
  },
  render: (args) => (
    <div className="w-full max-w-4xl p-6">
      <BreadcrumbsComponent {...args} />
    </div>
  )
};
