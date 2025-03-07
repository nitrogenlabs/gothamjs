import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import React from 'react';

import {MarkdownView} from './MarkdownView';

describe('MarkdownView', () => {
  it('renders markdown content as HTML', () => {
    const markdownContent = '# Hello\n**Bold text**\n- List item';
    render(<MarkdownView content={markdownContent} />);

    // Check heading is rendered
    expect(screen.getByText('Hello')).toBeInTheDocument();
    // Check bold text is rendered
    expect(screen.getByText('Bold text')).toBeInTheDocument();
    // Check list item is rendered
    expect(screen.getByText('List item')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-class';
    const {container} = render(
      <MarkdownView content="Some content" className={customClass} />
    );

    const markdownContainer = container.firstChild as HTMLElement;
    expect(markdownContainer).toHaveClass('markdown-container', customClass);
  });

  it('renders with default className when no className is provided', () => {
    const {container} = render(<MarkdownView content="Some content" />);

    const markdownContainer = container.firstChild as HTMLElement;
    expect(markdownContainer).toHaveClass('markdown-container');
  });

  it('applies correct default styles', () => {
    const {container} = render(<MarkdownView content="Some content" />);

    const markdownContainer = container.firstChild as HTMLElement;
    expect(markdownContainer).toHaveStyle({
      backgroundColor: 'transparent',
      height: '100%',
      overflow: 'auto',
      width: '100%'
    });
  });
});
