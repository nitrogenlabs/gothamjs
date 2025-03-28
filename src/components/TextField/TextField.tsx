/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import React, {forwardRef} from 'react';
import {Controller, useFormContext} from 'react-hook-form';

import {InputField} from './InputField';
import {ErrorMessage} from '../ErrorMessage/ErrorMessage';
import {Label} from '../Label/Label';

import type {GothamColor} from '../../utils/colorUtils';

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  readonly borderClass?: string;
  readonly className?: string;
  readonly color?: GothamColor;
  readonly defaultValue?: string;
  readonly error?: boolean;
  readonly errorColor?: GothamColor;
  readonly hasError?: boolean;
  readonly label?: string;
  readonly labelClass?: string;
  readonly labelColor?: GothamColor;
  readonly multiline?: boolean;
  readonly name: string;
  readonly onValidate?: (isValid: boolean) => void;
  readonly pattern?: string;
  readonly rows?: number;
}

export const TextField = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps>(({
  borderClass,
  className,
  color = 'neutral',
  defaultValue = '',
  error: externalError,
  errorColor = 'error',
  label,
  labelClass = 'mb-1',
  labelColor = 'neutral',
  multiline = false,
  name,
  onChange: onChangeProp,
  onValidate,
  pattern,
  value,
  ...restInputProps
}, ref) => {
  const {control, formState: {errors}} = useFormContext();
  const formError = errors?.[name];
  const hasError = !!formError;

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({field: {onBlur, onChange, ref: fieldRef, value}}) => (
        <div className="flex flex-col w-full">
          <Label
            className={labelClass}
            color={labelColor}
            label={label}
            name={name} />
          <div className="relative">
            <InputField
              className={borderClass}
              color={hasError ? 'error' : color}
              id={name}
              multiline={multiline}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              ref={(e) => {
                fieldRef(e);

                if (ref && typeof ref === 'object') {
                  ref.current = e;
                }
              }}
              {...restInputProps}
            />
            <ErrorMessage message={formError?.message as string} color={errorColor} />
          </div>
        </div>
      )}
    />
  );
});