import {fireEvent, render, screen} from '@testing-library/react';

import {DateField} from './DateField.js';

describe('DateField', () => {
  const initialDate = new Date(2026, 4, 15).getTime();

  it('renders a formatted date input with a label', () => {
    render(<DateField defaultValue={initialDate} label="Start date" name="startDate" />);

    expect(screen.getByLabelText('Start date')).toHaveValue('2026-05-15');
  });

  it('opens the picker on focus and emits selected dates', () => {
    const onChange = vi.fn();

    render(<DateField defaultValue={initialDate} label="Start date" name="startDate" onChange={onChange} />);

    fireEvent.focus(screen.getByLabelText('Start date'));
    fireEvent.click(screen.getByRole('button', {name: '20'}));

    expect(onChange).toHaveBeenCalledWith(new Date(2026, 4, 20).getTime());
    expect(screen.getByLabelText('Start date')).toHaveValue('2026-05-20');
  });

  it('clamps default values to the provided date range', () => {
    const minDate = new Date(2026, 5, 1).getTime();

    render(
      <DateField
        defaultValue={initialDate}
        label="Start date"
        minDate={minDate}
        name="startDate"
      />
    );

    expect(screen.getByLabelText('Start date')).toHaveValue('2026-06-01');
  });
});
