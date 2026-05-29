/* @vitest-environment jsdom */
import '@testing-library/jest-dom/vitest';
import {render, screen} from '@testing-library/react';

import {FaqSection} from './FaqSection.js';

describe('FaqSection', () => {
  it('renders faq questions and answers', () => {
    render(<FaqSection faqs={[{answer: 'Yes', question: 'Is it reusable?'}]} title="FAQ" />);

    expect(screen.getByText('Is it reusable?')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
  });
});
