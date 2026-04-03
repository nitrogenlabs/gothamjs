/* @vitest-environment jsdom */
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import {Breadcrumbs} from './Breadcrumbs.js';

describe('Breadcrumbs', () => {
  it('renders the contained breadcrumb trail', () => {
    render(
      <Breadcrumbs
        homeHref="/"
        items={[
          {href: '/projects', label: 'Projects'},
          {current: true, href: '/projects/nero', label: 'Project Nero'}
        ]}
      />
    );

    expect(screen.getByRole('navigation', {name: 'Breadcrumb'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Projects'})).toHaveAttribute('href', '/projects');
    expect(screen.getByRole('link', {name: 'Project Nero'})).toHaveAttribute('aria-current', 'page');
  });

  it('returns null when no items are provided', () => {
    const {container} = render(<Breadcrumbs items={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders the full variant layout classes', () => {
    render(
      <Breadcrumbs
        items={[
          {href: '/projects', label: 'Projects'},
          {current: true, href: '/projects/nero', label: 'Project Nero'}
        ]}
        variant="full"
      />
    );

    expect(screen.getByRole('navigation', {name: 'Breadcrumb'})).toHaveClass(
      'border-b',
      'border-gray-200',
      'bg-white'
    );
  });

  it('renders the chevrons variant spacing classes', () => {
    render(
      <Breadcrumbs
        items={[
          {href: '/projects', label: 'Projects'},
          {current: true, href: '/projects/nero', label: 'Project Nero'}
        ]}
        variant="chevrons"
      />
    );

    expect(screen.getByRole('list')).toHaveClass('items-center', 'space-x-4');
  });
});
