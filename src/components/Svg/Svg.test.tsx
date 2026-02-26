/* @vitest-environment jsdom */
/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {render} from '@nlabs/lex/test-react';

import {Svg} from './Svg.js';

describe('Svg', () => {
  let rendered;

  beforeAll(() => {
    rendered = render(<Svg name="pencil" />);
  });

  it('should render', () => expect(rendered).toBeDefined());
});
