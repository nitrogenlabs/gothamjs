/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {render} from '@nlabs/lex/test-react';

import {Gotham} from './Gotham';

describe('Gotham', () => {
  let rendered;

  beforeAll(() => {
    // Provide mock routes to avoid React Router warnings
    const mockConfig = {
      routes: [
        {
          path: '/',
          element: <div>Home Page</div>
        }
      ]
    };

    rendered = render(<Gotham config={mockConfig} />);
  });

  it('should render', () => {
    expect(rendered).toMatchSnapshot();
  });
});
