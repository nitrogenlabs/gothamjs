import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {Svg} from './Svg';

describe('Svg', () => {
  let rendered;

  beforeAll(() => {
    rendered = renderer.create(<Svg name="pencil" />);
  });

  it('should render', () => expect(rendered).toBeDefined());
});
