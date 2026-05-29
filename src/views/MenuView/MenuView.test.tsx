import {fireEvent, render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router';

import {MenuView} from './MenuView.js';

describe('MenuView', () => {
  it('renders the app shell navigation and search', () => {
    render(
      <MemoryRouter>
        <MenuView sideMenuItems={[]} userMenuItems={[]} />
      </MemoryRouter>
    );

    expect(screen.getByRole('searchbox', {name: 'Search'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Open sidebar'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'View notifications'})).toBeInTheDocument();
  });

  it('opens the mobile sidebar', () => {
    render(
      <MemoryRouter>
        <MenuView sideMenuItems={[]} userMenuItems={[]} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', {name: 'Open sidebar'}));

    expect(screen.getByRole('button', {name: 'Close sidebar'})).toBeInTheDocument();
    expect(screen.getAllByText('Dashboard').length).toBeGreaterThan(0);
  });
});
