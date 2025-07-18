/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import React, {forwardRef} from 'react';
import {Controller, useFormContext} from 'react-hook-form';

import {ErrorMessage} from '../ErrorMessage/ErrorMessage.js';
import {InputField} from '../InputField/InputField.js';
import {Label} from '../Label/Label.js';

import type {GothamColor} from '../../utils/colorUtils.js';
import type {InputBorderType} from '../InputField/InputField.js';

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  readonly borderColor?: GothamColor;
  readonly borderType?: InputBorderType;
  readonly className?: string;
  readonly color?: GothamColor;
  readonly defaultValue?: string;
  readonly error?: boolean;
  readonly errorColor?: GothamColor;
  readonly hasError?: boolean;
  readonly inputClass?: string;
  readonly label?: string;
  readonly labelClass?: string;
  readonly labelColor?: GothamColor;
  readonly multiline?: boolean;
  readonly name: string;
  readonly onValidate?: (isValid: boolean) => void;
  readonly pattern?: string;
  readonly placeholderColor?: GothamColor;
  readonly rows?: number;
  readonly textColor?: GothamColor;
}

export const TextField = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps>(({
  borderColor = 'black',
  borderType,
  className,
  color = 'neutral',
  defaultValue = '',
  error: externalError,
  errorColor = 'error',
  inputClass,
  label = '',
  labelClass = 'mb-1',
  labelColor = 'neutral',
  multiline = false,
  name,
  onChange: onChangeProp,
  onValidate,
  pattern,
  placeholderColor = 'neutral',
  rows,
  textColor = 'neutral',
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
              borderColor={borderColor}
              borderType={borderType}
              className={inputClass}
              color={hasError ? 'error' : color}
              id={name}
              multiline={multiline}
              onBlur={onBlur}
              onChange={onChange}
              placeholderColor={placeholderColor}
              textColor={textColor}
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