/* @vitest-environment jsdom */
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import {Spinner} from './Spinner.js';

describe('Spinner', () => {
  it('renders a loading status icon', () => {
    render(<Spinner />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
