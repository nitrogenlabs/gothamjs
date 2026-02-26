/* @vitest-environment jsdom */
/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {render} from '@nlabs/lex/test-react';

import {Gotham} from './Gotham.js';

describe('Gotham', () => {
  it('should render without crashing', () => {
    const mockConfig = {
      routes: [
        {
          element: <div>Home Page</div>,
          path: '/'
        }
      ]
    };

    const {container} = render(<Gotham config={mockConfig} />);

    expect(container).toBeDefined();
  });
});
