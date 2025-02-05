import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownViewProps {
  content: string;
  className?: string;
}

export const MarkdownView: React.FC<MarkdownViewProps> = ({content, className = ''}) => (
  <div className={`markdown-container ${className}`} style={{
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    overflow: 'auto'
  }}>
    <ReactMarkdown>{content}</ReactMarkdown>
  </div>
);
