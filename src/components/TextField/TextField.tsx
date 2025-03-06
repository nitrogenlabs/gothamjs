/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import React, {forwardRef, useEffect, useState} from 'react';
import {Controller, useFormContext} from 'react-hook-form';

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  readonly label?: string;
  readonly name: string;
  readonly pattern?: string;
  readonly onValidate?: (isValid: boolean) => void;
  readonly error?: boolean;
  readonly multiline?: boolean;
  readonly errorColor?: string;
  readonly defaultColor?: string;
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
  errorColor = 'red-500',
  defaultColor = 'gray-300',
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
        console.error('Invalid regex pattern:', e);
        setError(true);
        setErrorMessage('Invalid validation pattern');
      }
    }

    onChangeProp?.(event);
  };

  const hasError = error || externalError || errors[name];
  const inputClasses = `
    w-full px-3 py-2 border rounded-md shadow-sm
    focus:outline-none focus:ring-2
    ${hasError
      ? `border-${errorColor} focus:ring-${errorColor} focus:border-${errorColor}`
      : `border-${defaultColor} focus:ring-${defaultColor} focus:border-${defaultColor}`
    }
    ${multiline ? 'min-h-[100px] resize-y' : ''}
    ${className}
  `.trim();

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
              className={`block text-sm font-medium mb-1 ${
                hasError ? `text-${errorColor}` : `text-${defaultColor}`
              }`}
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
              <p className={`absolute -bottom-5 left-0 text-xs text-${errorColor}`}>
                {errorMessage || errors[name]?.message as string}
              </p>
            )}
          </div>
        </div>
      )}
    />
  );
});