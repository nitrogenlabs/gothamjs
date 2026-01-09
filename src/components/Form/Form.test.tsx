/**
 * Copyright (c) 2021-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {render, screen} from '@testing-library/react';
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
        <input name="email" defaultValue="invalid-email" />
        <input name="password" defaultValue="short" />
        <button type="submit">Submit</button>
      </Form>
    );

    // Should not show error list at top by default
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('should show errors at top when showErrors is true', () => {
    render(
      <Form
        schema={testSchema}
        showErrors={true}
        onSubmit={() => {}}
      >
        <input name="email" defaultValue="invalid-email" />
        <input name="password" defaultValue="short" />
        <button type="submit">Submit</button>
      </Form>
    );

    // Should show error list at top when prop is true
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});