/* @vitest-environment jsdom */
import '@testing-library/jest-dom/vitest';
import {render, screen} from '@testing-library/react';

import {AuthView} from './AuthView.js';

describe('AuthView', () => {
  it('renders the shared hero and card regions', () => {
    render(
      <AuthView
        cardDescription="Use your account credentials."
        cardTitle="Sign in"
        description="Return to your workspace."
        eyebrow="Acme identity"
        title="Welcome back."
      >
        <div>Auth form</div>
      </AuthView>
    );

    expect(screen.getByRole('heading', {level: 1, name: 'Welcome back.'})).toHaveClass('font-display', 'font-normal');
    expect(screen.getByRole('heading', {level: 2, name: 'Sign in'})).toHaveClass('text-[36px]');
    expect(screen.getByText('Auth form')).toBeInTheDocument();
  });
});
