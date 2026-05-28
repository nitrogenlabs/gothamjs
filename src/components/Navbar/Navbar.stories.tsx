import React from 'react';
import {Settings} from 'lucide-react';
import {interactWithCanvas} from '../../utils/storyInteractions.js';
import {Navbar, NavbarDivider, NavbarItem, NavbarLabel, NavbarSection, NavbarSpacer} from './Navbar.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof Navbar> = {
  argTypes: {
    className: {
      control: 'text'
    },
    isSticky: {
      control: 'boolean'
    },
    transparentOnScroll: {
      control: 'boolean'
    },
    transparentScrollThreshold: {
      control: 'number'
    }
  },
  component: Navbar,
  parameters: {
    layout: 'fullscreen'
  },
  title: 'Components/Navbar'
};

export const TransparentOnScroll: Story = {
  args: {
    transparentOnScroll: true
  },
  play: interactWithCanvas,
  render: (args) => (
    <div className="min-h-[160vh] bg-[linear-gradient(135deg,#101624,#1f4fd8_52%,#0f766e)] pt-0 text-white">
      <Navbar {...args}>
        <NavbarSection>
          <NavbarItem current href="#overview">
            <NavbarLabel>Overview</NavbarLabel>
          </NavbarItem>
          <NavbarItem href="#components">
            <NavbarLabel>Components</NavbarLabel>
          </NavbarItem>
        </NavbarSection>
        <NavbarSpacer />
        <NavbarDivider />
        <NavbarSection>
          <NavbarItem aria-label="Settings">
            <Settings />
          </NavbarItem>
        </NavbarSection>
      </Navbar>
      <main className="px-8 pt-28">
        <h1 className="max-w-3xl text-6xl font-bold leading-none">Transparent navbar over a hero.</h1>
        <p className="mt-6 max-w-xl text-lg text-white/75">Scroll to see the navbar switch to its translucent surface.</p>
      </main>
    </div>
  )
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  play: interactWithCanvas,
  render: (args) => (
    <Navbar {...args}>
      <NavbarSection>
        <NavbarItem current href="#overview">
          <NavbarLabel>Overview</NavbarLabel>
        </NavbarItem>
        <NavbarItem href="#components">
          <NavbarLabel>Components</NavbarLabel>
        </NavbarItem>
      </NavbarSection>
      <NavbarSpacer />
      <NavbarDivider />
      <NavbarSection>
        <NavbarItem aria-label="Settings">
          <Settings />
        </NavbarItem>
      </NavbarSection>
    </Navbar>
  )
};
