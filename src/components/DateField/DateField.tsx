/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {forwardRef, useEffect, useMemo, useRef, useState} from 'react';
import {Controller, useFormContext} from 'react-hook-form';

import {useIsMobile} from '../../hooks/useIsMobile.js';
import {getOutlineClasses} from '../../utils/colorUtils.js';
import {ErrorMessage} from '../ErrorMessage/ErrorMessage.js';
import {InputField, type InputFieldProps} from '../InputField/InputField.js';
import {Label} from '../Label/Label.js';
import {DatePicker} from './DatePicker.js';

import type {GothamColor} from '../../utils/colorUtils.js';

export interface DateFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  readonly className?: string;
  readonly color?: GothamColor;
  readonly defaultValue?: number;
  readonly disabled?: boolean;
  readonly label?: string;
  readonly labelClass?: string;
  readonly labelColor?: GothamColor;
  readonly name: string;
  readonly error?: boolean;
  readonly errorColor?: GothamColor;
  readonly maxDate?: number;
  readonly minDate?: number;
  readonly onChange?: (date) => void;
  readonly value?: number;
}

export const DateField = forwardRef<HTMLInputElement, DateFieldProps>(({
  className = 'w-full rounded-md outline-1 outline-solid focus:outline-3 px-3.5 py-2 text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50 sm:text-sm sm:leading-6',
  color = 'primary',
  defaultValue,
  disabled = false,
  error: externalError,
  label = '',
  labelClass = 'mb-1',
  labelColor = 'neutral',
  maxDate,
  minDate,
  name,
  onChange,
  type = 'text',
  value,
  ...props
}, ref) => {
  const isMobile = useIsMobile();
  const {control, formState: {errors}, clearErrors, trigger} = useFormContext();
  const formError = errors?.[name];
  const hasError = !!formError || !!externalError;
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const outlineClasses = useMemo(
    () => getOutlineClasses(hasError ? 'error' : color, {hasFocus: true, hasHover: true}),
    [color, hasError]
  );
  const inputClasses = [
    'bg-white/30 dark:bg-black/30',
    disabled ? 'text-neutral/30 dark:text-neutral-dark/30 outline-neutral/30 dark:outline-neutral-dark/30' : outlineClasses,
    className
  ].filter(Boolean).join(' ');

  useEffect(() => {
    if (ref && typeof ref === 'object' && inputRef.current) {
      ref.current = inputRef.current;
    }
  }, [ref, inputRef.current]);

  const ensureDateInRange = (timestamp: number): number => {
    if (!timestamp) return timestamp;

    if (minDate && timestamp < minDate) {
      return minDate;
    }

    if (maxDate && timestamp > maxDate) {
      return maxDate;
    }

    return timestamp;
  };

  const formatDateForInput = (timestamp: number): string => {
    return new Date(timestamp).toISOString().split('T')[0];
  };

  const parseInputDate = (dateString: string): number => {
    return new Date(dateString).getTime();
  };

  const isDateValid = (timestamp: number): boolean => {
    if (minDate && timestamp < minDate) {
      return false;
    }
    if (maxDate && timestamp > maxDate) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsPickerVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={value || ensureDateInRange(defaultValue || new Date().getTime())}
      render={({field}) => (
        <div className="flex flex-col w-full" ref={ref}>
          <Label
            className={labelClass}
            color={labelColor}
            hasError={hasError}
            label={label}
            name={name} />
          <div className="relative">
            <InputField
              {...props as Omit<InputFieldProps, 'onChange'>}
              ref={inputRef}
              disabled={disabled}
              value={formatDateForInput(field.value)}
              onChange={(changeEvent) => {
                const timestamp = parseInputDate(changeEvent.target.value);
                field.onChange(timestamp);

                if (isDateValid(timestamp)) {
                  clearErrors(name);
                  trigger(name);
                }

                if (onChange) {
                  onChange(timestamp);
                }
              }}
              onFocus={() => {
                if (!isMobile) {
                  setIsPickerVisible(true);
                }
              }}
              onBlur={() => {
                // Validate on blur
                trigger(name);
              }}
              className={inputClasses}
              type={isMobile ? 'date' : type}
              min={minDate ? formatDateForInput(minDate) : undefined}
              max={maxDate ? formatDateForInput(maxDate) : undefined}
            />
            {isPickerVisible && !disabled && !isMobile && (
              <div ref={pickerRef} className="absolute z-10 mt-1">
                <DatePicker
                  initialDate={field.value}
                  minDate={minDate}
                  maxDate={maxDate}
                  onDateSelect={(timestamp) => {
                    field.onChange(timestamp);

                    if (isDateValid(timestamp)) {
                      clearErrors(name);
                      trigger(name);
                    }

                    if (onChange) {
                      onChange(timestamp);
                    }
                    setIsPickerVisible(false);
                  }}
                />
              </div>
            )}
            <ErrorMessage message={formError?.message as string} />
          </div>
        </div>
      )}
    />
  );
});