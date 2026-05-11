import {cn} from '@nlabs/utils';

import type {HTMLAttributes} from 'react';

export type AlertVariant = 'default' | 'destructive';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  readonly variant?: AlertVariant;
}

const variantClasses: Record<AlertVariant, string> = {
  default: 'bg-card text-card-foreground',
  destructive: 'bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 [&>svg]:text-current'
};

export const Alert = ({
  className,
  role = 'alert',
  variant = 'default',
  ...props
}: AlertProps) => (
  <div
    className={cn(
      'relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border border-border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
      variantClasses[variant],
      className
    )}
    data-slot="alert"
    role={role}
    {...props}
  />
);

export const AlertTitle = ({className, ...props}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight', className)}
    data-slot="alert-title"
    {...props}
  />
);

export const AlertDescription = ({className, ...props}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('col-start-2 grid justify-items-start gap-1 text-sm text-muted-foreground [&_p]:leading-relaxed', className)}
    data-slot="alert-description"
    {...props}
  />
);
