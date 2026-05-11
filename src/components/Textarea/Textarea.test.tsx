/* @vitest-environment jsdom */
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import {Textarea} from './Textarea.js';

describe('Textarea', () => {
  it('renders a textarea', () => {
    render(<Textarea aria-label="Notes" />);

    expect(screen.getByRole('textbox', {name: 'Notes'})).toBeInTheDocument();
  });
});
