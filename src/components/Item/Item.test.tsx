/* @vitest-environment jsdom */
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle
} from './Item.js';

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

  it('renders item slots and variants', () => {
    render(
      <ItemGroup>
        <Item as="article" size="sm" variant="outline">
          <ItemHeader>Header</ItemHeader>
          <ItemMedia variant="image">
            <img alt="Avatar" src="/avatar.png" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Account</ItemTitle>
            <ItemDescription>Billing contact</ItemDescription>
          </ItemContent>
          <ItemActions>Actions</ItemActions>
          <ItemFooter>Footer</ItemFooter>
        </Item>
        <ItemSeparator />
      </ItemGroup>
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByRole('article')).toHaveAttribute('data-size', 'sm');
    expect(screen.getByRole('img', {name: 'Avatar'})).toHaveAttribute('src', '/avatar.png');
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('renders as a child element', () => {
    render(
      <Item asChild variant="muted">
        <a href="/team">Team</a>
      </Item>
    );

    expect(screen.getByRole('link', {name: 'Team'})).toHaveAttribute('data-variant', 'muted');
  });
});
