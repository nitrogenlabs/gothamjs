import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {Gotham} from './Gotham';

describe('Gotham', () => {
  let rendered;

  beforeAll(() => {
    // Render
    rendered = renderer.create(<Gotham />);
  });

  it('should render', () => expect(rendered).toBeDefined());
});
