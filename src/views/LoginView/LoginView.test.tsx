import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {LoginView} from './LoginView';

describe('LoginView', () => {
  let rendered;

  beforeAll(() => {
    // Render
    rendered = renderer.create(<LoginView />);
  });

  it('should render', () => expect(rendered).toBeDefined());

  it('should match snapshot', () => expect(rendered).toMatchSnapshot());
});
