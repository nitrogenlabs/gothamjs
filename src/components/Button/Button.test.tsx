/* @vitest-environment jsdom */
import '@testing-library/jest-dom/vitest';
import {fireEvent, render, screen} from '@testing-library/react';
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

  it('keeps content in the layout while loading', () => {
    render(<Button isLoading>Save</Button>);

    expect(screen.getByText('Save')).toHaveClass('opacity-0');
    expect(screen.getByRole('button', {name: 'Save'}).querySelector('svg')).toHaveClass('absolute');
  });

  it('applies shadow styles to non-text buttons', () => {
    render(<Button hasShadow>Save</Button>);

    expect(screen.getByRole('button', {name: 'Save'})).toHaveClass('shadow-[0_0_12px_rgba(0,0,0,0.12)]');
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

  it('renders label, icon, notification, and outlined styles', () => {
    render(
      <Button
        hasNotification
        icon={<span data-testid="save-icon" />}
        label="Save"
        size="sm"
        variant="outlined"
      />
    );

    expect(screen.getByRole('button', {name: 'Save'})).toHaveClass('border-1', 'text-sm');
    expect(screen.getByTestId('save-icon')).toBeInTheDocument();
  });

  it('renders text and large variants', () => {
    render(<Button label="Cancel" size="lg" variant="text" />);

    expect(screen.getByRole('button', {name: 'Cancel'})).toHaveClass('bg-transparent', 'text-lg');
  });

  it('supports the solid and outline variant aliases with separate color props', () => {
    render(<Button backgroundColor="secondary" label="Build" labelColor="primary" variant="outline" />);

    expect(screen.getByRole('button', {name: 'Build'})).toHaveClass(
      'bg-secondary',
      'border-primary',
      'text-primary'
    );
  });

  it('uses the label color as the outline border color when no background is set', () => {
    render(<Button label="Coding" labelColor="secondary" variant="outline" />);

    expect(screen.getByRole('button', {name: 'Coding'})).toHaveClass(
      'bg-transparent',
      'border-secondary',
      'text-secondary'
    );
  });

  it('uses numeric rounded values as inline border radius', () => {
    render(<Button label="Rounded" rounded={8} />);

    expect(screen.getByRole('button', {name: 'Rounded'})).toHaveStyle({borderRadius: '8px'});
  });
});
