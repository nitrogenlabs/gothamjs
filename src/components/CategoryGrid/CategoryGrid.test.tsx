/* @vitest-environment jsdom */
import '@testing-library/jest-dom/vitest';
import {render, screen} from '@testing-library/react';

import {CategoryGrid} from './CategoryGrid.js';

describe('CategoryGrid', () => {
  it('renders category cards', () => {
    render(<CategoryGrid categories={[{imageAlt: 'Desk setup', imageSrc: '/desk.jpg', name: 'Workspace'}]} />);

    expect(screen.getByText('Workspace')).toBeInTheDocument();
    expect(screen.getByAltText('Desk setup')).toHaveAttribute('src', '/desk.jpg');
  });
});
