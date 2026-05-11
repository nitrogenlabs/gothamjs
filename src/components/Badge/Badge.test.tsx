/* @vitest-environment jsdom */
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import {Badge} from './Badge.js';

describe('Badge', () => {
  it('renders its content', () => {
    render(<Badge>Beta</Badge>);

    expect(screen.getByText('Beta')).toBeInTheDocument();
  });
});
