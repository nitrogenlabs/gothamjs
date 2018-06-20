import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {Component} from './Component';

describe('Component', () => {
  let component;
  let rendered;

  beforeAll(() => {
    rendered = renderer.create(<Component className="test" />);
    component = rendered.root.instance;
  });

  it('should render', () => expect(rendered).toBeDefined());

  it('#getStyles', () => {
    const styles = component.getStyles();
    return expect(styles).toBe('test component');
  });

  it('#addStyles', () => {
    const styles = component.addStyles();
    return expect(styles.length).toBe(0);
  });
});
