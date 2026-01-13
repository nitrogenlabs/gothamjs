/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {forwardRef, useState} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {useTranslation} from '../../i18n/index.js';
import {Eye, EyeOff} from '../../icons/index.js';

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
  readonly showPasswordToggle?: boolean;
  readonly textColor?: GothamColor;
  readonly type?: string;
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
  placeholder = '',
  placeholderColor = 'neutral',
  rows,
  showPasswordToggle = false,
  textColor = 'neutral',
  type = 'text',
  value,
  ...restInputProps
}, ref) => {
  const {t} = useTranslation();
  const {control, formState: {errors}, trigger} = useFormContext();
  const formError = errors?.[name];
  const hasError = !!formError || !!externalError;
  const placeholderText = placeholder ? t(placeholder) : '';
  const [showPassword, setShowPassword] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({field: {onBlur, onChange, ref: fieldRef, value}}) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          if (!isTouched && e.target.value !== value) {
            setIsTouched(true);
          }
          onChange(e);
          if (onChangeProp) {
            onChangeProp(e);
          }

          if (onValidate && pattern) {
            const isValid = new RegExp(pattern).test(e.target.value);
            onValidate(isValid);
          }
        };

        const handleFocus = () => {
          setIsTouched(true);
        };

        const handleBlur = () => {
          onBlur();

          if (isTouched) {
            trigger(name);
          }
        };

        const inputType = type === 'password' && showPassword ? 'text' : type;

        return (
          <div className="flex flex-col w-full">
            <Label
              className={labelClass}
              color={labelColor}
              label={label}
              name={name}
            />
            <div className="relative">
              <InputField
                borderColor={borderColor}
                borderType={borderType}
                className={inputClass}
                color={hasError ? 'error' : color}
                id={name}
                multiline={multiline}
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder={placeholderText}
                placeholderColor={placeholderColor}
                textColor={textColor}
                type={inputType}
                value={value}
                ref={(e) => {
                  fieldRef(e);
                  if (ref && typeof ref === 'object') {
                    ref.current = e;
                  }
                }}
                {...restInputProps}
              />
              {type === 'password' && showPasswordToggle && (
                <button
                  type="button"
                  className={`absolute inset-y-0 flex items-center ${
                    borderType === 'underline' ? 'right-0 pr-3' : 'right-0 pr-3.5'
                  } text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300`}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              )}
              <ErrorMessage
                message={formError?.message as string || (externalError ? 'Invalid input' : undefined)}
                color={errorColor}
              />
            </div>
          </div>
        );
      }}
    />
  );
});