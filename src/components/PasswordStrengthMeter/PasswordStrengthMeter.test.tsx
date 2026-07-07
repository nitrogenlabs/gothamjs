/* @vitest-environment jsdom */
import '@testing-library/jest-dom/vitest';
import {render, screen} from '@testing-library/react';

import {getPasswordStrength, PasswordStrengthMeter} from './PasswordStrengthMeter.js';

describe('PasswordStrengthMeter', () => {
  it('scores password strength', () => {
    expect(getPasswordStrength('abcd')).toEqual({label: 'Too short', score: 0});
    expect(getPasswordStrength('correcthorse')).toEqual({label: 'Fair', score: 2});
    expect(getPasswordStrength('CorrectHorse123')).toEqual({label: 'Good', score: 3});
    expect(getPasswordStrength('CorrectHorse123!')).toEqual({label: 'Strong', score: 4});
  });

  it('renders the current strength label', () => {
    render(<PasswordStrengthMeter password="CorrectHorse123!" />);

    expect(screen.getByRole('status', {name: 'Password strength: Strong'})).toBeInTheDocument();
    expect(screen.getByText('Strong')).toBeInTheDocument();
  });
});
