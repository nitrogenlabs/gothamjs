/* @vitest-environment jsdom */
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import {Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle} from './Dialog.js';

describe('Dialog', () => {
  it('renders dialog content when open', () => {
    render(
      <Dialog onClose={() => {}} open>
        <DialogTitle>Refund payment</DialogTitle>
        <DialogDescription>Refunds take a few days.</DialogDescription>
        <DialogBody>Amount field goes here.</DialogBody>
        <DialogActions>Actions</DialogActions>
      </Dialog>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Refund payment')).toBeInTheDocument();
    expect(screen.getByText('Refunds take a few days.')).toBeInTheDocument();
  });
});
