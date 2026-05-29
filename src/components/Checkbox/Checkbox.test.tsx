import {fireEvent, render, screen} from '@testing-library/react';

import {Checkbox} from './Checkbox.js';

describe('Checkbox', () => {
  it('renders label, description, and error text', () => {
    render(
      <Checkbox
        description="Accept the terms before continuing."
        error="This field is required."
        label="Accept terms"
        name="terms"
      />
    );

    expect(screen.getByRole('checkbox', {name: 'Accept terms'})).not.toBeChecked();
    expect(screen.getByText('Accept the terms before continuing.')).toBeInTheDocument();
    expect(screen.getByText('This field is required.')).toBeInTheDocument();
  });

  it('updates local state and calls onChange when selected', () => {
    const onChange = vi.fn();

    render(<Checkbox label="Receive updates" name="updates" onChange={onChange} />);

    const checkbox = screen.getByRole('checkbox', {name: 'Receive updates'});
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
