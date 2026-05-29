import {fireEvent, render, screen} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router';

import {HomeView} from './HomeView.js';

describe('HomeView', () => {
  it('renders title and children', () => {
    render(
      <MemoryRouter>
        <HomeView title="Gotham">
          <p>Home content</p>
        </HomeView>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', {name: 'Gotham'})).toBeInTheDocument();
    expect(screen.getByText('Home content')).toBeInTheDocument();
  });

  it('navigates from desktop navigation', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/contact" element={<p>Contact route</p>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getAllByRole('button', {name: 'Contact'}).at(0) as HTMLButtonElement);

    expect(screen.getByText('Contact route')).toBeInTheDocument();
  });
});
