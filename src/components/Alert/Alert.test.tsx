/* @vitest-environment jsdom */
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import {Alert, AlertDescription, AlertTitle} from './Alert.js';

describe('Alert', () => {
  it('renders title and description', () => {
    render(
      <Alert>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Something changed.</AlertDescription>
      </Alert>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Heads up')).toBeInTheDocument();
    expect(screen.getByText('Something changed.')).toBeInTheDocument();
  });
});
