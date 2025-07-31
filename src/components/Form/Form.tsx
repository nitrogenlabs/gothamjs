/**
 * Copyright (c) 2021-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {zodResolver} from '@hookform/resolvers/zod';
import {useCallback} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {z} from 'zod';


import type {BaseSyntheticEvent, ReactNode} from 'react';

export interface FormProps<T> {
  readonly children: ReactNode | ((methods: ReturnType<typeof useForm>) => ReactNode);
  readonly className?: string;
  readonly defaultValues?: Record<string, unknown>;
  readonly errors?: Record<string, unknown>;
  readonly mode?: 'onSubmit' | 'onBlur' | 'onChange' | 'onTouched' | 'all';
  readonly name?: string;
  readonly onChange?: (data: unknown) => void;
  readonly onSubmit: (data: T, event: BaseSyntheticEvent, setError: (field: string, error: { type: string; message: string }) => void) => void;
  readonly schema?: z.ZodSchema<T>;
  readonly validate?: (data: unknown) => void;
  readonly validateOnBlur?: boolean;
}

export const Form = <T extends Record<string, unknown>>({
  children,
  className,
  defaultValues = {},
  errors = {},
  mode = 'onBlur',
  name = 'default',
  schema,
  onSubmit
}: FormProps<T>) => {
  const methods = useForm({
    defaultValues,
    mode,
    // @ts-ignore - Type compatibility issues between zod versions
    resolver: schema ? zodResolver(schema) : undefined
  });
  const {handleSubmit, setError, formState: {errors: formErrors}} = methods;
  const handleFormSubmit = useCallback(
    handleSubmit((data, event) => onSubmit(data, event as BaseSyntheticEvent, setError)),
    []
  );

  const allErrors = {...formErrors, ...errors};

  return (
    <FormProvider {...methods}>
      <form
        className={className}
        data-testid={`form-${name}`}
        onSubmit={handleFormSubmit}
        noValidate
      >
        {Object.keys(allErrors).length > 0 && (
          <ul className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">
            {Object.keys(allErrors).map((error) => {
              const errorValue = allErrors[error];
              const message = typeof errorValue === 'object' && errorValue && 'message' in errorValue
                ? (errorValue as {message: string}).message
                : String(errorValue);
              return <li key={error}>{message}</li>;
            })}
          </ul>
        )}
        {typeof children === 'function' ? children(methods) : children}
      </form>
    </FormProvider>
  );
};
