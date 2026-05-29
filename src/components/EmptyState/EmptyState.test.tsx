import {fireEvent, render, screen} from '@testing-library/react';

import {EmptyState} from './EmptyState.js';

describe('EmptyState', () => {
  it('renders title, description, and action button', () => {
    const onAction = vi.fn();

    render(
      <EmptyState
        actionLabel="Create project"
        description="Start by creating a new project."
        onAction={onAction}
        title="No projects"
      />
    );

    expect(screen.getByText('No projects')).toBeInTheDocument();
    expect(screen.getByText('Start by creating a new project.')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', {name: 'Create project'}));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('renders a custom action when provided', () => {
    render(
      <EmptyState
        action={<a href="/projects">View archive</a>}
        description="Nothing is active right now."
        title="No active items"
      />
    );

    expect(screen.getByRole('link', {name: 'View archive'})).toHaveAttribute('href', '/projects');
  });
});
