import {Loader2} from '../../icons/index.js';
import {cn} from '@nlabs/utils';

import type {ComponentProps} from 'react';

export const Spinner = ({className, ...props}: ComponentProps<typeof Loader2>) => (
  <Loader2
    aria-label="Loading"
    className={cn('size-4 animate-spin', className)}
    role="status"
    {...props}
  />
);
