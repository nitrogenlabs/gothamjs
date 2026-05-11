/* @vitest-environment jsdom */
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import {Avatar, AvatarButton, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage} from './Avatar.js';

describe('Avatar', () => {
  it('renders a Tailwind-style avatar from src and initials', () => {
    render(<Avatar alt="Bruce Wayne" initials="BW" src="/bruce.jpg" />);

    expect(screen.getByRole('img', {name: 'Bruce Wayne'})).toHaveAttribute('src', '/bruce.jpg');
    expect(screen.getByText('BW')).toBeInTheDocument();
  });

  it('hides fallback content after the image loads', () => {
    render(
      <Avatar>
        <AvatarImage alt="Selina Kyle" src="/selina.jpg" />
        <AvatarFallback>SK</AvatarFallback>
      </Avatar>
    );

    fireEvent.load(screen.getByRole('img', {name: 'Selina Kyle'}));

    expect(screen.queryByText('SK')).not.toBeInTheDocument();
  });

  it('renders fallback content', () => {
    render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );

    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  it('renders square avatars', () => {
    render(<Avatar data-testid="avatar" initials="BW" square />);

    expect(screen.getByTestId('avatar')).toHaveAttribute('data-square', 'true');
    expect(screen.getByTestId('avatar')).toHaveClass('rounded-lg');
  });

  it('renders avatar buttons', () => {
    render(<AvatarButton alt="Open profile" src="/profile.jpg" />);

    expect(screen.getByRole('button', {name: 'Open profile'})).toHaveAttribute('type', 'button');
    expect(screen.getByRole('img', {name: 'Open profile'})).toHaveAttribute('src', '/profile.jpg');
  });

  it('renders avatar groups', () => {
    render(
      <AvatarGroup>
        <Avatar />
        <AvatarGroupCount>+2</AvatarGroupCount>
      </AvatarGroup>
    );

    expect(screen.getByText('+2')).toBeInTheDocument();
  });
});
