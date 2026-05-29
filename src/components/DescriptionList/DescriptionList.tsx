import {cn} from '@nlabs/utils';

import type {ComponentPropsWithoutRef} from 'react';

export const DescriptionList = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'dl'>) => (
  <dl
    className={cn('grid grid-cols-1 text-base/6 sm:grid-cols-[min(50%,20rem)_auto] sm:text-sm/6', className)}
    data-slot="description-list"
    {...props}
  />
);

export const DescriptionTerm = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'dt'>) => (
  <dt
    className={cn('col-start-1 border-t border-border pt-3 text-muted-foreground first:border-none sm:py-3 dark:border-border-dark dark:text-muted-foreground-dark', className)}
    data-slot="description-term"
    {...props}
  />
);

export const DescriptionDetails = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'dd'>) => (
  <dd
    className={cn('pt-1 pb-3 text-foreground sm:border-t sm:border-border sm:py-3 sm:[&:nth-of-type(1)]:border-none dark:text-foreground-dark dark:sm:border-border-dark', className)}
    data-slot="description-details"
    {...props}
  />
);
