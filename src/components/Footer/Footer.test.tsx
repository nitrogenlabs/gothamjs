/* @vitest-environment jsdom */
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import {Footer} from './Footer.js';

describe('Footer', () => {
  it('renders brand, links, support email, and copyright', () => {
    render(
      <Footer
        brand={<span>GothamJS</span>}
        copyright="Copyright 2026 GothamJS"
        links={[
          {href: '/docs', label: 'Docs'},
          {href: '/blog', label: 'Blog'}
        ]}
        supportEmail="help@gothamjs.io"
        supportLabel="Help Desk"
      />
    );

    expect(screen.getByText('GothamJS')).toBeInTheDocument();
    expect(screen.getByRole('navigation', {name: 'Footer'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Docs'})).toHaveAttribute('href', '/docs');
    expect(screen.getByRole('link', {name: 'Blog'})).toHaveAttribute('href', '/blog');
    expect(screen.getByRole('link', {name: 'Help Desk'})).toHaveAttribute('href', 'mailto:help@gothamjs.io');
    expect(screen.getByText('Copyright 2026 GothamJS')).toBeInTheDocument();
  });

  it('does not render a support link for a blank support email', () => {
    render(<Footer supportEmail="   " />);

    expect(screen.queryByRole('link', {name: 'Support'})).not.toBeInTheDocument();
  });

  it('uses the default support label when a support email is provided', () => {
    render(<Footer supportEmail="support@gothamjs.io" />);

    expect(screen.getByRole('link', {name: 'Support'})).toHaveAttribute('href', 'mailto:support@gothamjs.io');
  });
});
