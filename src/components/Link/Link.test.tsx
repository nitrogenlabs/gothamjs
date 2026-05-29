/* @vitest-environment jsdom */
import '@testing-library/jest-dom/vitest';
import {render, screen} from '@testing-library/react';

import {Link} from './Link.js';

describe('Link', () => {
  it('renders a link', () => {
    render(<Link href="/docs">Docs</Link>);

    expect(screen.getByRole('link', {name: 'Docs'})).toHaveAttribute('href', '/docs');
  });
});
