/* @vitest-environment jsdom */
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import {vi} from 'vitest';

import {Button} from './Button.js';

describe('Button', () => {
  it('renders button content', () => {
    render(<Button>Save</Button>);

    expect(screen.getByRole('button', {name: 'Save'})).toBeInTheDocument();
  });

  it('disables the button while loading', () => {
    render(<Button isLoading>Save</Button>);

    expect(screen.getByRole('button', {name: 'Save'})).toBeDisabled();
  });

  it('passes native button attributes and click handlers through', () => {
    const onClick = vi.fn();

    render(
      <Button aria-label="Save changes" onClick={onClick} variant="contained">
        Save
      </Button>
    );

    fireEvent.click(screen.getByRole('button', {name: 'Save changes'}));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders as a child element when asChild is true', () => {
    render(
      <Button asChild className="custom-button" variant="text">
        <a href="/docs">Docs</a>
      </Button>
    );

    expect(screen.getByRole('link', {name: 'Docs'})).toHaveAttribute('href', '/docs');
    expect(screen.getByRole('link', {name: 'Docs'})).toHaveClass('custom-button');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
