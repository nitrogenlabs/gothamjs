/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {Gotham} from './Gotham';

describe('Gotham', () => {
  let rendered;

  beforeAll(() => {
    rendered = renderer.create(<Gotham />);
  });

  it('should render', () => {
    expect(rendered).toMatchSnapshot();
  });
});
