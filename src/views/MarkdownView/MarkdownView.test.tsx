/* @vitest-environment jsdom */
import {render} from '@nlabs/lex/test-react';

import {MarkdownView} from './MarkdownView.js';

describe('MarkdownView', () => {
  it('should render with custom className when provided', () => {
    const customClass = 'custom-class';
    const {container} = render(
      <MarkdownView className={customClass} content="Some content" />
    );

    const markdownContainer = container.firstChild as HTMLElement;

    expect(markdownContainer).toHaveClass('markdown-container', customClass);
  });

  it('should render with default className when no className is provided', () => {
    const {container} = render(<MarkdownView content="Some content" />);

    const markdownContainer = container.firstChild as HTMLElement;

    expect(markdownContainer).toHaveClass('markdown-container');
  });

  it('should apply correct default styles', () => {
    const {container} = render(<MarkdownView content="Some content" />);

    const markdownContainer = container.firstChild as HTMLElement;
    const styles = markdownContainer.getAttribute('style');

    expect(styles).toContain('background-color: transparent');
    expect(styles).toContain('height: 100%');
    expect(styles).toContain('overflow: auto');
    expect(styles).toContain('width: 100%');
  });
});
