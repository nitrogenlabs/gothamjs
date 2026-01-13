/**
 * Copyright (c) 2021-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {z} from 'zod';

import {Form} from './Form.js';

const testSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

describe('Form', () => {
  it('should not show errors at top by default', () => {
    render(
      <Form
        schema={testSchema}
        onSubmit={() => {}}
      >
        {(methods) => (
          <>
            <input {...methods.register('email')} defaultValue="invalid-email" />
            <input {...methods.register('password')} defaultValue="short" />
            <button type="submit">Submit</button>
          </>
        )}
      </Form>
    );

    // Should not show error list at top by default
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('should show errors at top when showErrors is true', async () => {
    render(
      <Form
        schema={testSchema}
        showErrors={true}
        onSubmit={() => {}}
      >
        {(methods) => (
          <>
            <input {...methods.register('email')} defaultValue="invalid-email" />
            <input {...methods.register('password')} defaultValue="short" />
            <button type="submit">Submit</button>
          </>
        )}
      </Form>
    );

    // Submit the form to trigger validation
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(submitButton);

    // Should show error list at top when prop is true
    await waitFor(() => {
      expect(screen.getByRole('list')).toBeInTheDocument();
    });
  });
});