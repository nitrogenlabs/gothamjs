/* @vitest-environment jsdom */
import '@testing-library/jest-dom/vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import {vi} from 'vitest';

import {PaymentMethodPanel} from './PaymentMethodPanel.js';

describe('PaymentMethodPanel', () => {
  it('renders a secure empty state and starts the provider flow', () => {
    const onAdd = vi.fn();

    render(<PaymentMethodPanel onAdd={onAdd} />);

    expect(screen.getByText('No payment method saved')).toBeInTheDocument();
    expect(screen.queryByLabelText(/card number/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', {name: 'Add payment method'}));

    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it('renders a masked payment method with replace and remove actions', () => {
    const onAdd = vi.fn();
    const onRemove = vi.fn();

    render(
      <PaymentMethodPanel
        brand="Visa"
        last4="4242"
        onAdd={onAdd}
        onRemove={onRemove}
      />
    );

    expect(screen.getByText('Visa ending in 4242')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', {name: 'Replace payment method'}));
    fireEvent.click(screen.getByRole('button', {name: 'Remove'}));

    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
