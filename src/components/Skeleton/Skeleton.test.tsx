/* @vitest-environment jsdom */
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import {Skeleton} from './Skeleton.js';

describe('Skeleton', () => {
  it('renders a skeleton block', () => {
    const {container} = render(<Skeleton className="h-4 w-8" />);

    expect(container.firstChild).toHaveAttribute('data-slot', 'skeleton');
  });
});
