/* @vitest-environment jsdom */
import '@testing-library/jest-dom/vitest';
import {render, screen} from '@testing-library/react';

import {Code, Strong, Text, TextLink} from './Text.js';

describe('Text', () => {
  it('renders text primitives', () => {
    render(
      <Text>
        Read the <TextLink href="/docs">docs</TextLink>, <Strong>please</Strong>. Use <Code>npm test</Code>.
      </Text>
    );

    expect(screen.getByText('docs').closest('p')).toHaveTextContent('Read the docs, please. Use npm test.');
    expect(screen.getByRole('link', {name: 'docs'})).toHaveAttribute('href', '/docs');
    expect(screen.getByText('please')).toBeInTheDocument();
    expect(screen.getByText('npm test')).toBeInTheDocument();
  });
});
