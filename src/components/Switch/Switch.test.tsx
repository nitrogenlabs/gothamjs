/* @vitest-environment jsdom */
import '@testing-library/jest-dom/vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import {vi} from 'vitest';

import {Switch} from './Switch.js';

describe('Switch', () => {
  it('toggles checked state', () => {
    const onCheckedChange = vi.fn();
    render(<Switch aria-label="Notifications" onCheckedChange={onCheckedChange} />);

    const control = screen.getByRole('switch', {name: 'Notifications'});

    expect(control).toHaveAttribute('aria-checked', 'false');

    fireEvent.click(control);

    expect(control).toHaveAttribute('aria-checked', 'true');
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('renders a hidden input when named', () => {
    render(<Switch aria-label="Marketing" defaultChecked name="marketing" />);

    expect(screen.getByRole('switch', {name: 'Marketing'})).toHaveAttribute('aria-checked', 'true');
    expect(document.querySelector('input[name="marketing"]')).toBeInTheDocument();
  });
});
