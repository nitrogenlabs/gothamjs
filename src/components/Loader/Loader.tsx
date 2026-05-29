/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {cn} from '@nlabs/utils';

import type {HTMLAttributes} from 'react';
import type {GothamColor} from '../../utils/colorUtils.js';
import type {GothamSize} from '../../utils/sizeUtils.js';

export interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  readonly color?: GothamColor;
  readonly content?: string;
  readonly size?: GothamSize;
}

const sizeClasses: Record<GothamSize, string> = {
  lg: 'size-10 border-3',
  md: 'size-8 border-2',
  sm: 'size-5 border-2'
};

const colorClasses: Record<GothamColor, string> = {
  black: 'text-black dark:text-white',
  error: 'text-error dark:text-error-dark',
  info: 'text-info dark:text-info-dark',
  link: 'text-link dark:text-link-dark',
  neutral: 'text-neutral dark:text-neutral-dark',
  primary: 'text-primary dark:text-primary-dark',
  secondary: 'text-secondary dark:text-secondary-dark',
  success: 'text-success dark:text-success-dark',
  tertiary: 'text-tertiary dark:text-tertiary-dark',
  transparent: 'text-transparent',
  warning: 'text-warning dark:text-warning-dark',
  white: 'text-white dark:text-white-dark'
};

export const Loader = ({
  className,
  color = 'primary',
  content = 'Loading...',
  size = 'md',
  ...props
}: LoaderProps) => (
  <div
    aria-label={content}
    className={cn(
      'inline-block animate-spin rounded-full border-solid border-current border-t-transparent',
      sizeClasses[size],
      colorClasses[color],
      className
    )}
    role="status"
    {...props}>
    <span className="sr-only">{content}</span>
  </div>
);
