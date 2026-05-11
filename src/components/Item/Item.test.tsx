/* @vitest-environment jsdom */
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import {Item, ItemContent, ItemDescription, ItemTitle} from './Item.js';

describe('Item', () => {
  it('renders item content', () => {
    render(
      <Item>
        <ItemContent>
          <ItemTitle>Team</ItemTitle>
          <ItemDescription>Engineering</ItemDescription>
        </ItemContent>
      </Item>
    );

    expect(screen.getByText('Team')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
  });
});
