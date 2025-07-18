/**
 * Copyright (c) 2021-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {zodResolver} from '@hookform/resolvers/zod';
import {useCallback} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {z} from 'zod';


import type {BaseSyntheticEvent, ReactNode} from 'react';

export interface FormProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly defaultValues?: Record<string, unknown>;
  readonly mode?: 'onSubmit' | 'onBlur' | 'onChange' | 'onTouched' | 'all';
  readonly name?: string;
  readonly onChange?: (data: unknown) => void;
  readonly onSubmit: (data: unknown, event: BaseSyntheticEvent, setError: (field: string, error: { type: string; message: string }) => void) => void;
  readonly schema?: z.ZodSchema<Record<string, unknown>>;
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
  onSubmit
}: FormProps) => {
  const methods = useForm({
    defaultValues,
    mode,
    // @ts-ignore - Type compatibility issues between zod versions
    resolver: schema ? zodResolver(schema) : undefined
  });
  const {handleSubmit, setError} = methods;
  const handleFormSubmit = useCallback(
    handleSubmit((data, event) => onSubmit(data, event as BaseSyntheticEvent, setError)),
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
