/* @vitest-environment jsdom */
import '@testing-library/jest-dom/vitest';
import {render, screen} from '@testing-library/react';

import {ReviewList} from './ReviewList.js';

describe('ReviewList', () => {
  it('renders reviews', () => {
    render(<ReviewList reviews={[{author: 'Ada Lovelace', body: 'Excellent.', rating: 5}]} />);

    expect(screen.getByText('Excellent.')).toBeInTheDocument();
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByLabelText('5 out of 5 stars')).toBeInTheDocument();
  });
});
