/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {Controller, useFormContext} from 'react-hook-form';

import {assignRef} from '../../utils/refUtils.js';

import type {InputHTMLAttributes, Ref} from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  readonly className?: string;
  readonly defaultValue?: string;
  readonly hasError?: boolean;
  readonly inputClass?: string;
  readonly multiline?: boolean;
  readonly name: string;
  readonly ref?: Ref<HTMLInputElement | HTMLTextAreaElement>;
}

export const Input = ({
  className,
  defaultValue = '',
  name,
  onBlur: onBlurProp,
  onChange: onChangeProp,
  placeholder = '',
  ref,
  value,
  ...restInputProps
}: InputProps) => {
  const {control} = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({field: {onBlur, onChange, ref: fieldRef, value: fieldValue}}) => (
        <input
          className={className}
          id={name}
          onBlur={(event) => {
            onBlur();
            onBlurProp?.(event);
          }}
          onChange={(event) => {
            onChange(event);
            onChangeProp?.(event);
          }}
          placeholder={placeholder}
          value={value ?? fieldValue}
          ref={(e) => {
            fieldRef(e);
            assignRef(ref, e);
          }}
          {...restInputProps}
        />
      )}
    />
  );
};
