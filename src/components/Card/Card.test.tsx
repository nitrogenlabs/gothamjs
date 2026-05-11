/* @vitest-environment jsdom */
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import {Card, CardContent, CardHeader, CardTitle} from './Card.js';

describe('Card', () => {
  it('renders sections', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>Body</CardContent>
      </Card>
    );

    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
  });
});
