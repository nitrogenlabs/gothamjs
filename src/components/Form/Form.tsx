/**
 * Copyright (c) 2021-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {yupResolver} from '@hookform/resolvers/yup';
import {BaseSyntheticEvent, ReactNode, useCallback} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import * as Yup from 'yup';

export interface FormProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly defaultValues?: Record<string, unknown>;
  readonly mode?: 'onSubmit' | 'onBlur' | 'onChange' | 'onTouched' | 'all';
  readonly name?: string;
  readonly onChange?: (data: unknown) => void;
  readonly onSubmit: (data: unknown, event: BaseSyntheticEvent, setError: (field: string, error: { type: string; message: string }) => void) => void;
  readonly schema?: Yup.ObjectSchema<unknown>;
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
    resolver: schema ? yupResolver(schema, {
      abortEarly: false,
      stripUnknown: true
    }) : undefined
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
