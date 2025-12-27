/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {forwardRef} from 'react';
import {Controller, useFormContext} from 'react-hook-form';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  readonly className?: string;
  readonly defaultValue?: string;
  readonly hasError?: boolean;
  readonly inputClass?: string;
  readonly multiline?: boolean;
  readonly name: string;
}

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(({
  className,
  defaultValue = '',
  name,
  onBlur: onBlurProp,
  onChange: onChangeProp,
  placeholder = '',
  value,
  ...restInputProps
}, ref) => {
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

            if (ref && typeof ref === 'object') {
              ref.current = e;
            }
          }}
          {...restInputProps}
        />
      )}
    />
  );
});