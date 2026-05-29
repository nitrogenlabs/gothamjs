/* @vitest-environment jsdom */
import '@testing-library/jest-dom/vitest';
import {render, screen} from '@testing-library/react';

import {Heading, Subheading} from './Heading.js';

describe('Heading', () => {
  it('renders the requested heading level', () => {
    render(<Heading level={3}>Overview</Heading>);

    expect(screen.getByRole('heading', {level: 3, name: 'Overview'})).toBeInTheDocument();
  });

  it('renders subheadings', () => {
    render(<Subheading>Details</Subheading>);

    expect(screen.getByRole('heading', {level: 2, name: 'Details'})).toBeInTheDocument();
  });
});
