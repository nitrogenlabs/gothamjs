import {cn} from '@nlabs/utils';

import type {HTMLAttributes} from 'react';

export const Skeleton = ({className, ...props}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('animate-pulse rounded-md bg-accent', className)}
    data-slot="skeleton"
    {...props}
  />
);
