/* @vitest-environment jsdom */
import '@testing-library/jest-dom/vitest';
import {render, screen} from '@testing-library/react';

import {ListContainer, ListItem} from './ListContainer.js';

describe('ListContainer', () => {
  it('renders list items', () => {
    render(<ListContainer><ListItem>First</ListItem></ListContainer>);

    expect(screen.getByRole('listitem')).toHaveTextContent('First');
  });
});
