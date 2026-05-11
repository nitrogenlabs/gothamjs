import {cn} from '@nlabs/utils';

import type {HTMLAttributes} from 'react';

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  readonly decorative?: boolean;
  readonly orientation?: 'horizontal' | 'vertical';
}

export const Separator = ({
  'aria-orientation': ariaOrientation,
  className,
  decorative = true,
  orientation = 'horizontal',
  role,
  ...props
}: SeparatorProps) => (
  <div
    aria-hidden={decorative ? true : undefined}
    aria-orientation={ariaOrientation ?? orientation}
    className={cn(
      'shrink-0 bg-border',
      orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
      className
    )}
    data-orientation={orientation}
    data-slot="separator"
    role={role ?? (decorative ? 'presentation' : 'separator')}
    {...props}
  />
);
