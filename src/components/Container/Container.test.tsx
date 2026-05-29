/* @vitest-environment jsdom */
import '@testing-library/jest-dom/vitest';
import {render, screen} from '@testing-library/react';

import {Container} from './Container.js';

describe('Container', () => {
  it('renders constrained content', () => {
    render(<Container size="md">Content</Container>);

    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
