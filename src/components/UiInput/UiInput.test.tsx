/* @vitest-environment jsdom */
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import {UiInput} from './UiInput.js';

describe('UiInput', () => {
  it('renders an input', () => {
    render(<UiInput aria-label="Email" />);

    expect(screen.getByRole('textbox', {name: 'Email'})).toBeInTheDocument();
  });
});
