import {cn} from '@nlabs/utils';
import {forwardRef} from 'react';

import type {TextareaHTMLAttributes} from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({className, ...props}, ref) => (
  <textarea
    className={cn(
      'flex min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input-dark/30 focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
      className
    )}
    data-slot="textarea"
    ref={ref}
    {...props}
  />
));

Textarea.displayName = 'Textarea';
