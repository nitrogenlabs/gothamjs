/* @vitest-environment jsdom */
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import {Pagination} from './Pagination.js';

describe('Pagination', () => {
  it('renders the simple variant summary dynamically', () => {
    render(
      <Pagination
        currentPage={2}
        pageSize={10}
        totalItems={42}
        totalPages={5}
        variant="simple"
      />
    );

    expect(screen.getByText(/Showing/i)).toHaveTextContent('Showing 11 to 20 of 42 results');
  });

  it('calls onPageChange when navigating in the simple variant', () => {
    const onPageChange = vi.fn();

    render(
      <Pagination
        currentPage={2}
        onPageChange={onPageChange}
        totalPages={5}
        variant="simple"
      />
    );

    fireEvent.click(screen.getByRole('button', {name: 'Previous'}));
    fireEvent.click(screen.getByRole('button', {name: 'Next'}));

    expect(onPageChange).toHaveBeenNthCalledWith(1, 1);
    expect(onPageChange).toHaveBeenNthCalledWith(2, 3);
  });

  it('does not render when there is only one page', () => {
    const {container} = render(
      <Pagination
        currentPage={1}
        totalPages={1}
        variant="simple"
      />
    );

    expect(container).toBeEmptyDOMElement();
  });
});
