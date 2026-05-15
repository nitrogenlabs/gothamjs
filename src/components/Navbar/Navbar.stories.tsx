import React from 'react';
import {Settings} from 'lucide-react';
import {interactWithCanvas} from '../../utils/storyInteractions.js';
import {Navbar, NavbarDivider, NavbarItem, NavbarLabel, NavbarSection, NavbarSpacer} from './Navbar.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof Navbar> = {
  argTypes: {
    className: {
      control: 'text'
    }
  },
  component: Navbar,
  parameters: {
    layout: 'fullscreen'
  },
  title: 'Components/Navbar'
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
