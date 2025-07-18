import {render, screen} from '@nlabs/lex/test-react';

import {MarkdownView} from './MarkdownView.js';

jest.mock('react-markdown', () => ({
  __esModule: true,
  default: ({children}) => <div data-testid="react-markdown">{children}</div>
}));

describe('MarkdownView', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render markdown content as HTML', () => {
    const markdownContent = '# Hello\n**Bold text**\n- List item';
    render(<MarkdownView content={markdownContent} />);

    // Check that the markdown content is rendered (with mock, it shows raw markdown)
    expect(screen.getByTestId('react-markdown')).toBeInTheDocument();
    expect(screen.getByTestId('react-markdown')).toHaveTextContent('Hello');
    expect(screen.getByTestId('react-markdown')).toHaveTextContent('Bold text');
    expect(screen.getByTestId('react-markdown')).toHaveTextContent('List item');
  });

  it('should apply custom className when provided', () => {
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
