import {cn} from '@nlabs/utils';

import {renderWithAsChild} from '../ComponentUtils/renderWithAsChild.js';

import type {AnchorHTMLAttributes, ElementType, ReactNode} from 'react';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  readonly as?: ElementType;
  readonly asChild?: boolean;
  readonly children?: ReactNode;
}

export const Link = ({
  as,
  asChild = false,
  children,
  className,
  ...props
}: LinkProps) => renderWithAsChild(
  {
    as: as ?? 'a',
    asChild,
    children,
    className: cn('text-link underline-offset-4 hover:text-link-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:text-link-dark dark:hover:text-link-dark-300 dark:focus-visible:outline-ring-dark', className),
    ...props
  },
  {
    'data-slot': 'link'
  }
);
