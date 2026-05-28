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
  lg: 'size-10 border-b-3',
  md: 'size-8 border-b-2',
  sm: 'size-5 border-b-2'
};

const colorClasses: Record<GothamColor, string> = {
  black: 'border-black dark:border-white',
  error: 'border-error dark:border-error-dark',
  info: 'border-info dark:border-info-dark',
  link: 'border-link dark:border-link-dark',
  neutral: 'border-neutral dark:border-neutral-dark',
  primary: 'border-primary dark:border-primary-dark',
  secondary: 'border-secondary dark:border-secondary-dark',
  success: 'border-success dark:border-success-dark',
  tertiary: 'border-tertiary dark:border-tertiary-dark',
  transparent: 'border-transparent',
  warning: 'border-warning dark:border-warning-dark',
  white: 'border-white dark:border-white-dark'
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
      'inline-block animate-spin rounded-full border-solid border-transparent',
      sizeClasses[size],
      colorClasses[color],
      className
    )}
    role="status"
    {...props}>
    <span className="sr-only">{content}</span>
  </div>
);
