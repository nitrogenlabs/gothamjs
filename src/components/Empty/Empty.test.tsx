/* @vitest-environment jsdom */
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import {Empty, EmptyDescription, EmptyHeader, EmptyTitle} from './Empty.js';

describe('Empty', () => {
  it('renders the empty state content', () => {
    render(
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No data</EmptyTitle>
          <EmptyDescription>Try adding something.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );

    expect(screen.getByText('No data')).toBeInTheDocument();
    expect(screen.getByText('Try adding something.')).toBeInTheDocument();
  });
});
