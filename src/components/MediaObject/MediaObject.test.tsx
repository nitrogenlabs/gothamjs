/* @vitest-environment jsdom */
import '@testing-library/jest-dom/vitest';
import {render, screen} from '@testing-library/react';

import {MediaObject} from './MediaObject.js';

describe('MediaObject', () => {
  it('renders media and content', () => {
    render(<MediaObject description="Description" media={<span>Icon</span>} title="Title" />);

    expect(screen.getByText('Icon')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });
});
