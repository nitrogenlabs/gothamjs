/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {render} from '@testing-library/react';

import {Gotham} from './Gotham';

describe('Gotham', () => {
  let rendered;

  beforeAll(() => {
    rendered = render(<Gotham />);
  });

  it('should render', () => {
    expect(rendered).toMatchSnapshot();
  });
});
