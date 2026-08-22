/* @vitest-environment jsdom */
import '@testing-library/jest-dom/vitest';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {vi} from 'vitest';

import {AuthSignInView} from './AuthSignInView.js';

describe('AuthSignInView', () => {
  it('submits valid credentials and renders auth links', async () => {
    const onSubmit = vi.fn();
    render(
      <AuthSignInView
        description="Return to your workspace."
        forgotPasswordHref="/forgot"
        onSubmit={onSubmit}
        signUpHref="/signup"
        title="Welcome back."
      />
    );

    fireEvent.change(screen.getByRole('textbox', {name: 'Email'}), {target: {value: 'person@example.com'}});
    fireEvent.change(document.querySelector('input[name="password"]') as HTMLInputElement, {target: {value: 'secret-password'}});
    fireEvent.submit(screen.getByTestId('form-sign-in'));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
      email: 'person@example.com',
      password: 'secret-password',
      rememberEmail: true
    }), expect.anything(), expect.any(Function)));

    expect(screen.getByRole('link', {name: 'Forgot password?'})).toHaveAttribute('href', '/forgot');
    expect(screen.getByRole('link', {name: 'Sign Up'})).toHaveAttribute('href', '/signup');
  });
});
