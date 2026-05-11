import {cn} from '@nlabs/utils';

import type {HTMLAttributes} from 'react';

export const Kbd = ({className, ...props}: HTMLAttributes<HTMLElement>) => (
  <kbd
    className={cn('inline-flex min-h-6 items-center rounded-md border border-border bg-muted px-2 font-mono text-[0.8rem] font-medium text-muted-foreground', className)}
    data-slot="kbd"
    {...props}
  />
);
