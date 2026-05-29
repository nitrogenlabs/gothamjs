import {cn} from '@nlabs/utils';

import type {AnchorHTMLAttributes, ComponentPropsWithoutRef} from 'react';

export const Text = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'p'>) => (
  <p
    className={cn('text-base/6 text-muted-foreground sm:text-sm/6 dark:text-muted-foreground-dark', className)}
    data-slot="text"
    {...props}
  />
);

export const TextLink = ({
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    className={cn('font-medium text-link underline decoration-link/40 underline-offset-4 hover:text-link-700 hover:decoration-link dark:text-link-dark dark:decoration-link-dark/40 dark:hover:text-link-dark-300', className)}
    data-slot="text-link"
    {...props}
  />
);

export const Strong = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'strong'>) => (
  <strong
    className={cn('font-medium text-foreground dark:text-foreground-dark', className)}
    data-slot="strong"
    {...props}
  />
);

export const Code = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'code'>) => (
  <code
    className={cn('rounded-sm border border-border bg-muted px-1 py-0.5 text-sm font-medium text-foreground dark:border-border-dark dark:bg-muted-dark dark:text-foreground-dark', className)}
    data-slot="code"
    {...props}
  />
);
