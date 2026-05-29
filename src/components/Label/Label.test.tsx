import {render, screen} from '@testing-library/react';

import {Label} from './Label.js';

describe('Label', () => {
  it('renders a label for the provided field name', () => {
    render(<Label label="Email" name="email" />);

    expect(screen.getByText('Email')).toHaveAttribute('for', 'email');
  });

  it('renders nothing without label text', () => {
    const {container} = render(<Label label="" name="email" />);

    expect(container).toBeEmptyDOMElement();
  });
});
