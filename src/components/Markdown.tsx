import * as React from 'react';

// import rehypeReact from 'rehype-react';
// import remarkBreaks from 'remark-breaks';
// import remarkParse from 'remark-parse';
// import remarkRehype from 'remark-rehype';
// import {unified} from 'unified';

export interface MarkdownProps {
  readonly className?: string;
  readonly children: any;
}

export const Markdown = ({className, children}) => (
  <div className={className}>
    {/* {
      unified()
        .use(remarkParse)
        .use(remarkBreaks)
        .use(remarkRehype)
        .use(rehypeReact, {createElement: React.createElement})
        .processSync(children).result
    } */}
  </div>
);
