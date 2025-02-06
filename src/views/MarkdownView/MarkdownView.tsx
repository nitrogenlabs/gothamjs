import React, {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';

import {fetchJsonFromUrl, parseTemplate} from '../../utils/contentUtils';

interface MarkdownViewProps {
  content?: string;
  url?: string;
  values?: Record<string, any>;
  className?: string;
}

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
          setMarkdown(parseTemplate(data, values));
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
    <div className={`markdown-container ${className}`} style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
      overflow: 'auto'
    }}>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};
