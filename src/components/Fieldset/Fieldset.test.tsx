/* @vitest-environment jsdom */
import '@testing-library/jest-dom/vitest';
import {render, screen} from '@testing-library/react';

import {Field, FieldDescription, FieldGroup, FieldLabel, Fieldset, Legend} from './Fieldset.js';

describe('Fieldset', () => {
  it('renders grouped form labels and descriptions', () => {
    render(
      <Fieldset>
        <Legend>Profile</Legend>
        <FieldGroup>
          <Field>
            <FieldLabel>Name</FieldLabel>
            <FieldDescription>Shown on your public profile.</FieldDescription>
            <input />
          </Field>
        </FieldGroup>
      </Fieldset>
    );

    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Shown on your public profile.')).toBeInTheDocument();
  });
});
