/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import React, {forwardRef, useEffect, useState} from 'react';
import {Controller, useFormContext} from 'react-hook-form';

type ColorVariant = 'red' | 'gray' | 'blue' | 'green' | 'yellow' | 'purple';

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  readonly label?: string;
  readonly name: string;
  readonly pattern?: string;
  readonly onValidate?: (isValid: boolean) => void;
  readonly error?: boolean;
  readonly multiline?: boolean;
  readonly errorColor?: ColorVariant;
  readonly defaultColor?: ColorVariant;
}

export const TextField = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps>(({
  label,
  name,
  pattern,
  onValidate,
  onChange: onChangeProp,
  value: valueProp,
  error: externalError,
  className = '',
  multiline = false,
  errorColor = 'red',
  defaultColor = 'gray',
  ...props
}, ref) => {
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const {control, formState: {errors}} = useFormContext();

  useEffect(() => {
    if (externalError) {
      setError(true);
      setErrorMessage('This field is required');
    } else {
      setError(false);
      setErrorMessage('');
    }
  }, [externalError]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = event.target.value;

    // Handle pattern validation
    if (pattern) {
      try {
        const regex = new RegExp(pattern);
        const isValid = regex.test(newValue);
        setError(!isValid);
        setErrorMessage(isValid ? '' : 'Invalid format');
        onValidate?.(isValid);
      } catch (e) {
        // Log validation error without using console
        setError(true);
        setErrorMessage('Invalid validation pattern');
      }
    }

    onChangeProp?.(event);
  };

  const hasError = error || externalError || errors[name];

  const getBorderClasses = () => {
    if (hasError) {
      return `border-${errorColor}-500 focus:ring-${errorColor}-500 focus:border-${errorColor}-500`;
    }
    return `border-${defaultColor}-300 focus:ring-${defaultColor}-500 focus:border-${defaultColor}-500`;
  };

  const getLabelClasses = () => {
    if (hasError) {
      return `text-${errorColor}-600`;
    }
    return `text-${defaultColor}-700`;
  };

  const getErrorClasses = () => `text-${errorColor}-600`;

  const inputClasses = [
    'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2',
    getBorderClasses(),
    multiline ? 'min-h-[100px] resize-y' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({field: {onChange, value, ...field}}) => (
        <div className="w-full">
          {label && (
            <label
              htmlFor={name}
              className={`block text-sm font-medium mb-1 ${getLabelClasses()}`}
            >
              {label}
            </label>
          )}
          <div className="relative">
            {multiline ? (
              <textarea
                ref={ref as React.Ref<HTMLTextAreaElement>}
                id={name}
                name={name}
                onChange={(e) => {
                  onChange(e);
                  handleChange(e);
                }}
                value={valueProp ?? value}
                className={inputClasses}
                {...field}
                {...props}
              />
            ) : (
              <input
                ref={ref as React.Ref<HTMLInputElement>}
                id={name}
                name={name}
                onChange={(e) => {
                  onChange(e);
                  handleChange(e);
                }}
                value={valueProp ?? value}
                className={inputClasses}
                {...field}
                {...props}
              />
            )}
            {hasError && (
              <p className={`absolute -bottom-5 left-0 text-xs ${getErrorClasses()}`}>
                {errorMessage || errors[name]?.message as string}
              </p>
            )}
          </div>
        </div>
      )}
    />
  );
});