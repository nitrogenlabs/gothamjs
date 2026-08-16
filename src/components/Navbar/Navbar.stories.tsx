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
    isFloating: {
      control: 'boolean'
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
    isSticky: true,
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

export const FloatingIsland: Story = {
  args: {
    isFloating: true,
    isSticky: true
  },
  play: interactWithCanvas,
  render: (args) => (
    <div className="min-h-[110vh] bg-[radial-gradient(circle_at_70%_20%,rgba(56,189,248,.2),transparent_32%),linear-gradient(180deg,#040817,#0f172a)] pt-1 text-white">
      <Navbar {...args} className="border-white/10 bg-[#0d1528]/80 text-white">
        <NavbarSection>
          <NavbarItem href="#brand">
            <NavbarLabel>Gotham</NavbarLabel>
          </NavbarItem>
        </NavbarSection>
        <NavbarSpacer />
        <NavbarSection className="hidden lg:flex">
          <NavbarItem current href="#home">
            <NavbarLabel>Home</NavbarLabel>
          </NavbarItem>
          <NavbarItem href="#browse">
            <NavbarLabel>Browse</NavbarLabel>
          </NavbarItem>
          <NavbarItem href="#events">
            <NavbarLabel>Events</NavbarLabel>
          </NavbarItem>
        </NavbarSection>
        <NavbarSpacer />
        <NavbarSection>
          <NavbarItem href="#login">
            <NavbarLabel>Login</NavbarLabel>
          </NavbarItem>
          <NavbarItem className="bg-sky-300 text-slate-950 hover:bg-white hover:text-slate-950" href="#access">
            <NavbarLabel>Request Access</NavbarLabel>
          </NavbarItem>
        </NavbarSection>
      </Navbar>
      <main className="mx-auto max-w-4xl px-8 pt-32 text-center">
        <h1 className="text-6xl font-light leading-none text-slate-100">Floating island navigation.</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-slate-300">Use isFloating for centered, rounded navbar surfaces over immersive hero layouts.</p>
      </main>
    </div>
  )
};

export const Default: Story = {
  play: interactWithCanvas,
  render: (args) => (
    <Navbar
      {...args}
      mobileMenu={(
        <nav className="grid gap-2" aria-label="Mobile example navigation">
          <NavbarItem current href="#overview">
            <NavbarLabel>Overview</NavbarLabel>
          </NavbarItem>
          <NavbarItem href="#components">
            <NavbarLabel>Components</NavbarLabel>
          </NavbarItem>
          <NavbarItem aria-label="Settings">
            <Settings />
            <NavbarLabel>Settings</NavbarLabel>
          </NavbarItem>
        </nav>
      )}>
      <NavbarSection className="hidden lg:flex">
        <NavbarItem current href="#overview">
          <NavbarLabel>Overview</NavbarLabel>
        </NavbarItem>
        <NavbarItem href="#components">
          <NavbarLabel>Components</NavbarLabel>
        </NavbarItem>
      </NavbarSection>
      <NavbarSpacer />
      <NavbarDivider />
      <NavbarSection className="hidden lg:flex">
        <NavbarItem aria-label="Settings">
          <Settings />
        </NavbarItem>
      </NavbarSection>
    </Navbar>
  )
};
