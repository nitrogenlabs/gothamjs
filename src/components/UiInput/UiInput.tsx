import {cn} from '@nlabs/utils';
import {forwardRef} from 'react';

import type {InputHTMLAttributes} from 'react';

export interface UiInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const UiInput = forwardRef<HTMLInputElement, UiInputProps>(({className, type = 'text', ...props}, ref) => (
  <input
    className={cn(
      'h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input-dark/30 focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
      className
    )}
    data-slot="ui-input"
    ref={ref}
    type={type}
    {...props}
  />
));

UiInput.displayName = 'UiInput';
