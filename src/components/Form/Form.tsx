/**
 * Copyright (c) 2021-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {zodResolver} from '@hookform/resolvers/zod';
import {BaseSyntheticEvent, ReactNode, useCallback} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {z} from 'zod';

export interface FormProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly defaultValues?: Record<string, unknown>;
  readonly mode?: 'onSubmit' | 'onBlur' | 'onChange' | 'onTouched' | 'all';
  readonly name?: string;
  readonly onChange?: (data: unknown) => void;
  readonly onSubmit: (data: unknown, event: BaseSyntheticEvent, setError: (field: string, error: { type: string; message: string }) => void) => void;
  readonly schema?: z.ZodSchema<unknown>;
  readonly validate?: (data: unknown) => void;
  readonly validateOnBlur?: boolean;
}

export const Form = ({
  children,
  className,
  defaultValues = {},
  mode = 'onBlur',
  name = 'default',
  schema,
  onChange,
  onSubmit,
  validate,
  validateOnBlur
}: FormProps) => {
  const methods = useForm({
    defaultValues,
    mode,
    resolver: schema ? zodResolver(schema) : undefined
  });
  const {handleSubmit, setError} = methods;
  const handleFormSubmit = useCallback(
    handleSubmit((data, event) => onSubmit(data, event, setError)),
    []
  );

  return (
    <FormProvider {...methods}>
      <form
        className={className}
        data-testid={`form-${name}`}
        onSubmit={handleFormSubmit}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
};
