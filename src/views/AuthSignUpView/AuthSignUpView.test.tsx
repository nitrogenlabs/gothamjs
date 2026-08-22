/* @vitest-environment jsdom */
import '@testing-library/jest-dom/vitest';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {vi} from 'vitest';

import {AuthSignUpView} from './AuthSignUpView.js';

describe('AuthSignUpView', () => {
  it('submits a valid account and renders related links', async () => {
    const onSubmit = vi.fn();
    render(
      <AuthSignUpView
        description="Create your workspace."
        onSubmit={onSubmit}
        resendVerificationHref="/verify/resend"
        signInHref="/sign-in"
        termsHref="/terms"
        title="Join us."
      />
    );

    fireEvent.change(screen.getByRole('textbox', {name: 'Email'}), {target: {value: 'person@example.com'}});
    fireEvent.change(document.querySelector('input[name="password"]') as HTMLInputElement, {target: {value: 'secret-password'}});
    fireEvent.change(document.querySelector('input[name="confirmPassword"]') as HTMLInputElement, {target: {value: 'secret-password'}});
    fireEvent.click(screen.getByRole('checkbox', {name: 'I agree to the Terms and Conditions'}));
    fireEvent.submit(screen.getByTestId('form-sign-up'));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
      acceptTerms: true,
      confirmPassword: 'secret-password',
      email: 'person@example.com',
      password: 'secret-password'
    }), expect.anything(), expect.any(Function)));

    expect(screen.getByRole('link', {name: 'Read terms'})).toHaveAttribute('href', '/terms');
    expect(screen.getByRole('link', {name: 'Sign In'})).toHaveAttribute('href', '/sign-in');
    expect(screen.getByRole('link', {name: 'Resend verification'})).toHaveAttribute('href', '/verify/resend');
  });
});
