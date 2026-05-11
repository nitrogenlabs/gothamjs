/* @vitest-environment jsdom */
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import {Separator} from './Separator.js';

describe('Separator', () => {
  it('renders a separator role when decorative is false', () => {
    render(<Separator decorative={false} />);

    expect(screen.getByRole('separator')).toBeInTheDocument();
  });
});
