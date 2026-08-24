/* @vitest-environment jsdom */
import '@testing-library/jest-dom/vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import {vi} from 'vitest';

import {Switch, SwitchGroup} from './Switch.js';

describe('Switch', () => {
  it('toggles checked state', () => {
    const onCheckedChange = vi.fn();
    render(<Switch aria-label="Notifications" onCheckedChange={onCheckedChange} />);

    const control = screen.getByRole('switch', {name: 'Notifications'});

    expect(control).not.toBeChecked();

    fireEvent.click(control);

    expect(control).toBeChecked();
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('renders a named input', () => {
    render(<Switch aria-label="Marketing" defaultChecked name="marketing" />);

    expect(screen.getByRole('switch', {name: 'Marketing'})).toBeChecked();
    expect(document.querySelector('input[name="marketing"]')).toBeInTheDocument();
  });

  it('keeps the unchecked track visible across consumer themes', () => {
    render(<Switch aria-label="Environment" />);

    const track = screen.getByRole('switch', {name: 'Environment'}).parentElement?.querySelector('span');

    expect(track).toHaveClass('bg-black/15', 'ring-black/20', 'dark:bg-white/25', 'dark:ring-white/25');
  });

  it('renders grouped switches', () => {
    render(
      <SwitchGroup>
        <Switch aria-label="Primary" color="success" />
        <Switch aria-label="Secondary" disabled />
      </SwitchGroup>
    );

    expect(screen.getByRole('switch', {name: 'Primary'})).toBeInTheDocument();
    expect(screen.getByRole('switch', {name: 'Secondary'})).toBeDisabled();
  });
});
