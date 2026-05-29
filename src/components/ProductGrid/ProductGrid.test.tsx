/* @vitest-environment jsdom */
import '@testing-library/jest-dom/vitest';
import {render, screen} from '@testing-library/react';

import {ProductGrid} from './ProductGrid.js';

describe('ProductGrid', () => {
  it('renders products', () => {
    render(<ProductGrid products={[{href: '/p', imageAlt: 'Bottle', imageSrc: '/bottle.jpg', name: 'Bottle', price: '$48'}]} />);

    expect(screen.getByRole('link', {name: /Bottle/})).toHaveAttribute('href', '/p');
    expect(screen.getByAltText('Bottle')).toHaveAttribute('src', '/bottle.jpg');
  });
});
