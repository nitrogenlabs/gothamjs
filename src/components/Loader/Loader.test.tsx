/* @vitest-environment jsdom */
import '@testing-library/jest-dom/vitest';
import {render, screen} from '@testing-library/react';

import {Loader} from './Loader.js';

describe('Loader', () => {
  it('renders a visible status indicator', () => {
    render(<Loader content="Loading projects" />);

    const loader = screen.getByRole('status', {name: 'Loading projects'});

    expect(loader).toHaveClass('border-current');
    expect(loader).toHaveClass('border-t-transparent');
  });
});
