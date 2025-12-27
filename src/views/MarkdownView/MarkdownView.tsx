import React, {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';

import {fetchJsonFromUrl, parseTemplate} from '../../utils/contentUtils.js';


interface MarkdownViewProps {
  className?: string;
  content?: string;
  url?: string;
  values?: Record<string, unknown>;
}

const defaultStyles: React.CSSProperties = {
  backgroundColor: 'transparent',
  height: '100%',
  overflow: 'auto',
  width: '100%'
};

export const MarkdownView: React.FC<MarkdownViewProps> = ({
  className = '',
  content,
  url,
  values = {}
}) => {
  const [markdown, setMarkdown] = useState<string>('');

  useEffect(() => {
    const loadContent = async () => {
      try {
        if (url) {
          const data = await fetchJsonFromUrl(url);
          setMarkdown(parseTemplate(data as string, values));
        } else if (content) {
          setMarkdown(parseTemplate(content, values));
        }
      } catch (error) {
        console.error('Failed to load markdown content:', error);
        setMarkdown('Error loading content');
      }
    };

    loadContent();
  }, [url, content, values]);

  return (
    <div className={`markdown-container ${className}`.trim()} style={defaultStyles}>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};
