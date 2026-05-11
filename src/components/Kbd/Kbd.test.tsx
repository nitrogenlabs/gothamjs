/* @vitest-environment jsdom */
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import {Kbd} from './Kbd.js';

describe('Kbd', () => {
  it('renders keyboard text', () => {
    render(<Kbd>cmd+k</Kbd>);

    expect(screen.getByText('cmd+k')).toBeInTheDocument();
  });
});
