/* @vitest-environment jsdom */
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import {Navbar, NavbarDivider, NavbarItem, NavbarLabel, NavbarSection, NavbarSpacer} from './Navbar.js';

describe('Navbar', () => {
  const setScrollY = (scrollY: number) => {
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: scrollY
    });
  };

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

  it('exposes sticky positioning with isSticky', () => {
    render(<Navbar aria-label="Primary" isSticky />);

    expect(screen.getByRole('navigation', {name: 'Primary'})).toHaveAttribute('data-sticky', 'true');
    expect(screen.getByRole('navigation', {name: 'Primary'})).toHaveClass('sticky');
  });

  it('turns sticky transparent navbars translucent after the default 10% scroll threshold', () => {
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 1000
    });
    setScrollY(99);

    render(<Navbar aria-label="Primary" isSticky transparentOnScroll />);

    const navbar = screen.getByRole('navigation', {name: 'Primary'});

    expect(navbar).toHaveAttribute('data-scroll-state', 'at-top');

    setScrollY(100);
    fireEvent.scroll(window);

    expect(navbar).toHaveAttribute('data-scroll-state', 'scrolled');
    expect(navbar).toHaveClass('data-[scroll-state=scrolled]:bg-background/80');
    expect(navbar).toHaveClass('data-[scroll-state=scrolled]:backdrop-blur-md');
  });

  it('keeps pixel thresholds for values greater than one', () => {
    setScrollY(49);

    render(<Navbar aria-label="Primary" transparentOnScroll transparentScrollThreshold={50} />);

    const navbar = screen.getByRole('navigation', {name: 'Primary'});

    expect(navbar).toHaveAttribute('data-scroll-state', 'at-top');

    setScrollY(50);
    fireEvent.scroll(window);

    expect(navbar).toHaveAttribute('data-scroll-state', 'scrolled');
  });

  it('opens and closes mobile navigation content', () => {
    render(
      <Navbar
        aria-label="Primary"
        transparentOnScroll
        mobileMenu={(
          <nav aria-label="Mobile primary">
            <NavbarItem href="/about">About</NavbarItem>
          </nav>
        )}
        mobileMenuTitle="Menu">
        <NavbarSection className="hidden lg:flex">
          <NavbarItem href="/">Home</NavbarItem>
        </NavbarSection>
      </Navbar>
    );

    const trigger = screen.getByRole('button', {name: 'Open navigation menu'});
    const menu = screen.getByLabelText('Mobile navigation');
    const navbar = screen.getByRole('navigation', {name: 'Primary'});

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(navbar).toHaveAttribute('data-scroll-state', 'at-top');
    expect(menu).toHaveClass('translate-x-full');

    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(document.body).toHaveStyle({overflow: 'hidden'});
    expect(document.documentElement).toHaveStyle({overflow: 'hidden'});
    expect(navbar).toHaveAttribute('data-mobile-menu-open', 'true');
    expect(navbar).toHaveAttribute('data-scroll-state', 'scrolled');
    expect(menu).toHaveClass('translate-x-0');
    expect(menu).toHaveClass('bg-[rgba(16,22,36,.78)]');
    expect(menu).toHaveClass('text-white');
    expect(document.querySelector('[data-slot="navbar-mobile-overlay"]')).toHaveClass('backdrop-blur-md');
    expect(screen.getByRole('link', {name: 'About'})).toHaveAttribute('href', '/about');

    fireEvent.click(screen.getByRole('button', {name: 'Close navigation menu'}));

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(document.body.style.overflow).toBe('');
    expect(document.documentElement.style.overflow).toBe('');
    expect(navbar).not.toHaveAttribute('data-mobile-menu-open');
    expect(navbar).toHaveAttribute('data-scroll-state', 'at-top');
    expect(menu).toHaveClass('translate-x-full');
  });
});
