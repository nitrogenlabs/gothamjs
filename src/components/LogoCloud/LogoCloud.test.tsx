/* @vitest-environment jsdom */
import '@testing-library/jest-dom/vitest';
import {render, screen} from '@testing-library/react';

import {LogoCloud} from './LogoCloud.js';

describe('LogoCloud', () => {
  it('renders logos', () => {
    render(<LogoCloud logos={[{alt: 'Acme', src: '/logo.svg'}]} title="Trusted by teams" />);

    expect(screen.getByRole('heading', {name: 'Trusted by teams'})).toBeInTheDocument();
    expect(screen.getByAltText('Acme')).toHaveAttribute('src', '/logo.svg');
  });
});
