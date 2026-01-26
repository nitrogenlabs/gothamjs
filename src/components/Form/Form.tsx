/**
 * Copyright (c) 2021-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {zodResolver} from '@hookform/resolvers/zod/dist/zod.js';
import {useCallback} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {z} from 'zod';

import type {BaseSyntheticEvent, ReactNode} from 'react';

export interface FormProps<T> {
  readonly children: ReactNode | ((methods: ReturnType<typeof useForm>) => ReactNode);
  readonly className?: string;
  readonly defaultValues?: Record<string, unknown>;
  readonly disabled?: boolean;
  readonly errors?: Record<string, unknown>;
  readonly mode?: 'onSubmit' | 'onBlur' | 'onChange' | 'onTouched' | 'all';
  readonly name?: string;
  readonly onChange?: (data: unknown) => void;
  readonly onSubmit: (
    data: T,
    event: BaseSyntheticEvent,
    setError: (field: string, error: { type: string; message: string }) => void
  ) => void;
  readonly schema?: z.ZodSchema<T>;
  readonly showErrors?: boolean;
  readonly validate?: (data: unknown) => void;
  readonly validateOnBlur?: boolean;
}

export const Form = <T extends Record<string, unknown>>({
  children,
  className,
  defaultValues = {},
  disabled = false,
  errors = {},
  mode = 'onBlur',
  name = 'default',
  schema,
  showErrors = false,
  onSubmit
}: FormProps<T>) => {
  const methods = useForm({
    defaultValues,
    mode,
    resolver: schema ? zodResolver(schema as any) : undefined
  });
  const {handleSubmit, setError, formState} = methods;
  const {errors: formErrors, isSubmitting} = formState;
  const handleFormSubmit = useCallback(
    (event: BaseSyntheticEvent) => {
      if(isSubmitting || disabled) {
        event.preventDefault();
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      handleSubmit((data, submitEvent) => onSubmit(data, submitEvent as BaseSyntheticEvent, setError))(event);
    },
    [handleSubmit, onSubmit, setError, isSubmitting, disabled]
  );

  const allErrors = {...formErrors, ...errors};

  // Extract error messages from various error structures
  const getErrorMessages = (errorObj: Record<string, unknown>): string[] => Object.values(errorObj).flatMap((error) => {
    if(typeof error === 'string') {
      return error;
    }
    if(typeof error === 'object' && error && 'message' in error) {
      return (error as {message: string}).message;
    }
    if(typeof error === 'object' && error && 'root' in error && typeof error.root === 'object' && error.root && 'message' in error.root) {
      return (error.root as {message: string}).message;
    }
    return [];
  }).filter(Boolean);

  const errorMessages = getErrorMessages(allErrors);

  return (
    <FormProvider {...methods}>
      <form
        className={className}
        data-testid={`form-${name}`}
        noValidate
        onSubmit={handleFormSubmit}
      >
        {showErrors && errorMessages.length > 0 && (
          <div
            aria-live="polite"
            className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
            role="alert"
          >
            <ul className="list-disc list-inside">
              {errorMessages.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          </div>
        )}
        {typeof children === 'function' ? children(methods) : children}
      </form>
    </FormProvider>
  );
};
