/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import { render } from '@nlabs/lex/test-react';

import { Gotham } from './Gotham.js';

describe('Gotham', () => {
  let rendered;

  beforeAll(() => {
    // Provide mock routes to avoid React Router warnings
    // Don't include translations to avoid i18n wrapper
    const mockConfig = {
      routes: [
        {
          path: '/',
          element: <div>Home Page</div>
        }
      ]
      // Intentionally not including translations to test without i18n wrapper
    };

    rendered = render(<Gotham config={mockConfig} />);
  });

  it('should render', () => {
    expect(rendered).toMatchSnapshot();
  });
});
