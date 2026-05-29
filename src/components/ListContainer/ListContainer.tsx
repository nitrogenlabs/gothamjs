import {cn} from '@nlabs/utils';

import type {HTMLAttributes} from 'react';

export interface ListContainerProps extends HTMLAttributes<HTMLUListElement> {
  readonly divided?: boolean;
  readonly inset?: boolean;
  readonly variant?: 'plain' | 'card';
}

export const ListContainer = ({
  className,
  divided = true,
  inset = true,
  variant = 'plain',
  ...props
}: ListContainerProps) => (
  <ul
    className={cn(
      'overflow-hidden',
      divided && 'divide-y divide-border dark:divide-border-dark',
      variant === 'card' && 'rounded-md border border-border bg-card shadow-sm dark:border-border-dark dark:bg-card-dark',
      inset && 'px-4 sm:px-6',
      className
    )}
    data-slot="list-container"
    {...props}
  />
);

export const ListItem = ({
  className,
  ...props
}: HTMLAttributes<HTMLLIElement>) => (
  <li
    className={cn('py-4', className)}
    data-slot="list-item"
    {...props}
  />
);
