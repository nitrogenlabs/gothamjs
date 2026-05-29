/* @vitest-environment jsdom */
import '@testing-library/jest-dom/vitest';
import {render, screen} from '@testing-library/react';

import {ProgressSteps} from './ProgressSteps.js';

describe('ProgressSteps', () => {
  it('renders progress steps', () => {
    render(<ProgressSteps steps={[{id: 'Step 1', label: 'Details', status: 'current'}]} />);

    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Details')).toHaveAttribute('class', expect.stringContaining('text-foreground'));
  });
});
