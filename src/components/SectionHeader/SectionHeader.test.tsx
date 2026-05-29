/* @vitest-environment jsdom */
import '@testing-library/jest-dom/vitest';
import {render, screen} from '@testing-library/react';

import {SectionHeader} from './SectionHeader.js';

describe('SectionHeader', () => {
  it('renders title, eyebrow, and subtitle', () => {
    render(<SectionHeader eyebrow="New" subtitle="Details" title="Overview" />);

    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'Overview'})).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
  });
});
