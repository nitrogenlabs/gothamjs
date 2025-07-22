import { render } from '@nlabs/lex/test-react';

import { MarkdownView } from './MarkdownView.js';

describe('MarkdownView', () => {
  it('should render with custom className when provided', () => {
    const customClass = 'custom-class';
    const {container} = render(
      <MarkdownView content="Some content" className={customClass} />
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
    expect(markdownContainer).toHaveStyle({
      backgroundColor: 'transparent',
      height: '100%',
      overflow: 'auto',
      width: '100%'
    });
  });
});
