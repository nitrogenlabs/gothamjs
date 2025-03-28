/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import clsx from 'clsx';
import {forwardRef, useMemo} from 'react';

import {getOutlineClasses} from '../../utils/colorUtils';

import type {GothamColor} from '../../utils/colorUtils';
import type {InputHTMLAttributes, Ref, TextareaHTMLAttributes} from 'react';

export interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement> & TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  readonly className?: string;
  readonly color?: GothamColor;
  readonly id?: string;
  readonly multiline?: boolean;
}

export const InputField = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputFieldProps>(({
  className = 'w-full rounded-md outline-1 outline-solid focus:outline-3 px-3.5 py-2 text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50 sm:text-sm sm:leading-6',
  color,
  disabled = false,
  multiline,
  ...inputProps
}, ref) => {
  const outlineClasses = useMemo(() => getOutlineClasses(color, {hasFocus: true, hasHover: true}), [color]);
  const inputClasses = useMemo(() => clsx(
    className,
    disabled ? 'text-neutral/30 dark:text-neutral-dark/30 outline-neutral/30 dark:outline-neutral-dark/30' : outlineClasses,
    multiline ? 'min-h-[100px] resize-y' : ''
  ),
  [outlineClasses, className, disabled, multiline]);

  return multiline
    ? <textarea
      {...inputProps as TextareaHTMLAttributes<HTMLTextAreaElement>}
      className={inputClasses}
      disabled={disabled}
      ref={ref as Ref<HTMLTextAreaElement>}
    />
    : <input
      {...inputProps as InputHTMLAttributes<HTMLInputElement>}
      className={inputClasses}
      disabled={disabled}
      ref={ref as Ref<HTMLInputElement>}
    />;
});