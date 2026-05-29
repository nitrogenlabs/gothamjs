import {fireEvent, render, screen} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router';

import {DefaultView} from './DefaultView.js';

describe('DefaultView', () => {
  it('renders title and children', () => {
    render(
      <MemoryRouter>
        <DefaultView title="Admin">
          <p>Dashboard content</p>
        </DefaultView>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', {name: 'Admin'})).toBeInTheDocument();
    expect(screen.getByText('Dashboard content')).toBeInTheDocument();
  });

  it('opens the mobile navigation and navigates', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<DefaultView />} />
          <Route path="/about" element={<p>About route</p>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', {name: 'Open main menu'}));
    expect(screen.getByRole('button', {name: 'Open main menu'})).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(screen.getAllByRole('button', {name: 'About'}).at(-1) as HTMLButtonElement);
    expect(screen.getByText('About route')).toBeInTheDocument();
  });
});
