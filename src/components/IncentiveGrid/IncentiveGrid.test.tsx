/* @vitest-environment jsdom */
import '@testing-library/jest-dom/vitest';
import {render, screen} from '@testing-library/react';

import {IncentiveGrid} from './IncentiveGrid.js';

describe('IncentiveGrid', () => {
  it('renders incentives', () => {
    render(<IncentiveGrid incentives={[{description: 'Ships fast', title: 'Fast delivery'}]} />);

    expect(screen.getByText('Fast delivery')).toBeInTheDocument();
    expect(screen.getByText('Ships fast')).toBeInTheDocument();
  });
});
