/* @vitest-environment jsdom */
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import {Navbar, NavbarDivider, NavbarItem, NavbarLabel, NavbarSection, NavbarSpacer} from './Navbar.js';

describe('Navbar', () => {
  it('renders nav items with current state and links', () => {
    render(
      <Navbar aria-label="Primary">
        <NavbarSection>
          <NavbarItem href="/" current>
            <NavbarLabel>Home</NavbarLabel>
          </NavbarItem>
          <NavbarItem href="/events">Events</NavbarItem>
        </NavbarSection>
        <NavbarSpacer />
        <NavbarDivider />
        <NavbarItem aria-label="Search">Search</NavbarItem>
      </Navbar>
    );

    expect(screen.getByRole('navigation', {name: 'Primary'})).toHaveAttribute('data-slot', 'navbar');
    expect(screen.getByRole('link', {name: 'Home'})).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', {name: 'Events'})).toHaveAttribute('href', '/events');
    expect(screen.getByRole('button', {name: 'Search'})).toHaveAttribute('type', 'button');
  });
});
