/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {SignInView} from './SignInView';

describe('SignInView', () => {
  let rendered;

  beforeAll(() => {
    // Render
    rendered = renderer.create(<SignInView />);
  });

  it('should render', () => expect(rendered).toBeDefined());
});
