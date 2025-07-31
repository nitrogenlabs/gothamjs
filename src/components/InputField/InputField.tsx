/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {cn} from '@nlabs/utils';
import {forwardRef, useMemo} from 'react';

import {
  getBorderClasses,
  getOutlineClasses,
  getPlaceholderClasses,
  getTextClasses
} from '../../utils/colorUtils.js';

import type {InputHTMLAttributes, Ref, TextareaHTMLAttributes} from 'react';
import type {GothamColor} from '../../utils/colorUtils.js';

export type InputBorderType = 'solid' | 'rounded' | 'none' | 'underline';

export interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement> & TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  readonly borderColor?: GothamColor;
  readonly borderType?: InputBorderType;
  readonly className?: string;
  readonly id?: string;
  readonly label?: string;
  readonly multiline?: boolean;
  readonly placeholderColor?: GothamColor;
  readonly textColor?: GothamColor;
}

export const baseClasses = {
  none: '',
  rounded: 'w-full rounded-md outline-1 outline-solid focus:outline-3 px-3.5 py-2 sm:text-sm sm:leading-6 bg-white/30 dark:bg-black/30',
  solid: 'w-full outline-1 outline-solid focus:outline-3 px-3.5 py-2 sm:text-sm sm:leading-6 bg-white/30 dark:bg-black/30',
  underline: 'w-full border-b-2 focus:border-b-3 autofill:bg-transparent outline-none py-2 sm:text-sm sm:leading-6'
};

export const getInputBorderClass = (
  borderType: InputBorderType,
  borderColor: GothamColor,
  textColor: GothamColor,
  placeholderColor: GothamColor
) => cn(
  baseClasses[borderType],
  getTextClasses(textColor),
  borderType === 'underline'
    ? getBorderClasses(borderColor, {hasFocus: true, hasHover: true})
    : '',
  borderType === 'rounded' || borderType === 'solid'
    ? getOutlineClasses(borderColor, {hasFocus: true, hasHover: true})
    : '',
  getPlaceholderClasses(placeholderColor, {hasFocus: true, hasHover: true})
);

export const InputField = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputFieldProps>(({
  borderColor = 'neutral',
  borderType = 'solid',
  className,
  disabled = false,
  label,
  multiline = false,
  placeholderColor = 'neutral',
  textColor = 'neutral',
  ...inputProps
}, ref) => {
  const borderClasses = useMemo(
    () => getInputBorderClass(borderType, borderColor, textColor, placeholderColor),
    [borderType, borderColor, textColor, placeholderColor]
  );

  const inputClasses = useMemo(
    () => cn(
      className,
      disabled ? 'text-neutral/30 dark:text-neutral-dark/30 outline-neutral/30 dark:outline-neutral-dark/30' : borderClasses,
      multiline && 'min-h-[100px] resize-y'
    ),
    [className, borderClasses, disabled, multiline]
  );

  return multiline ? (
    <textarea
      {...inputProps as TextareaHTMLAttributes<HTMLTextAreaElement>}
      className={inputClasses}
      disabled={disabled}
      ref={ref as Ref<HTMLTextAreaElement>}
    />
  ) : (
    <input
      {...inputProps as InputHTMLAttributes<HTMLInputElement>}
      className={inputClasses}
      disabled={disabled}
      ref={ref as Ref<HTMLInputElement>}
    />
  );
});