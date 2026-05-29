import {render, screen} from '@testing-library/react';

import {ErrorMessage} from './ErrorMessage.js';

describe('ErrorMessage', () => {
  it('renders an error message', () => {
    render(<ErrorMessage color="error" message="Something went wrong." />);

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });

  it('renders nothing without a message', () => {
    const {container} = render(<ErrorMessage />);

    expect(container).toBeEmptyDOMElement();
  });
});
