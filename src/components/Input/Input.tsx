/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {assignRef} from '../../utils/refUtils.js';
import {useGothamFormContext} from '../Form/FormContext.js';

import type {ChangeEvent, InputHTMLAttributes, Ref, TextareaHTMLAttributes} from 'react';

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
  multiline = false,
  name,
  onBlur: onBlurProp,
  onChange: onChangeProp,
  placeholder = '',
  ref,
  value,
  ...restInputProps
}: InputProps) => {
  const form = useGothamFormContext();
  const fieldValue = value ?? form?.values[name];
  const resolvedDefaultValue = fieldValue === undefined ? String(form?.defaultValues[name] ?? defaultValue) : undefined;
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    form?.setValue(name, event.currentTarget.value);
    form?.clearError(name);
    onChangeProp?.(event);
  };

  if(multiline) {
    return (
      <textarea
        {...restInputProps as TextareaHTMLAttributes<HTMLTextAreaElement>}
        className={className}
        defaultValue={resolvedDefaultValue}
        id={name}
        name={name}
        onBlur={onBlurProp}
        onChange={handleChange}
        placeholder={placeholder}
        ref={(node) => assignRef(ref, node)}
        value={fieldValue as string | number | readonly string[] | undefined}
      />
    );
  }

  return (
    <input
      {...restInputProps as InputHTMLAttributes<HTMLInputElement>}
      className={className}
      defaultValue={resolvedDefaultValue}
      id={name}
      name={name}
      onBlur={onBlurProp}
      onChange={handleChange}
      placeholder={placeholder}
      ref={(node) => assignRef(ref, node)}
      value={fieldValue as string | number | readonly string[] | undefined}
    />
  );
};
