import {fireEvent, render, screen} from '@testing-library/react';

import {RadioField} from './RadioField.js';

const options = [
  {description: 'Email every release note.', label: 'Email', value: 'email'},
  {description: 'Send a text message.', label: 'SMS', value: 'sms'}
];

describe('RadioField', () => {
  it('renders options with descriptions', () => {
    render(<RadioField defaultValue="email" label="Notification channel" name="channel" options={options} />);

    expect(screen.getByRole('radio', {name: 'Email'})).toBeChecked();
    expect(screen.getByText('Email every release note.')).toBeInTheDocument();
    expect(screen.getByText('Send a text message.')).toBeInTheDocument();
  });

  it('updates the selected option', () => {
    render(<RadioField defaultValue="email" label="Notification channel" name="channel" options={options} />);

    fireEvent.click(screen.getByRole('radio', {name: 'SMS'}));

    expect(screen.getByRole('radio', {name: 'SMS'})).toBeChecked();
    expect(screen.getByRole('radio', {name: 'Email'})).not.toBeChecked();
  });
});
