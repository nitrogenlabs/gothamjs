import {render, screen} from '@testing-library/react';

import {NotFoundView} from './NotFoundView.js';

describe('NotFoundView', () => {
  it('renders the not found component', () => {
    render(<NotFoundView />);

    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});
