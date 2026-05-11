import {cn} from '@nlabs/utils';

import type {HTMLAttributes} from 'react';

export type EmptyMediaVariant = 'default' | 'icon';

const mediaClasses: Record<EmptyMediaVariant, string> = {
  default: 'bg-transparent',
  icon: 'flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg:not([class*=size-])]:size-6'
};

export const Empty = ({className, ...props}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border border-dashed border-border p-6 text-center text-balance md:p-12', className)}
    data-slot="empty"
    {...props}
  />
);

export const EmptyHeader = ({className, ...props}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex max-w-sm flex-col items-center gap-2 text-center', className)}
    data-slot="empty-header"
    {...props}
  />
);

export interface EmptyMediaProps extends HTMLAttributes<HTMLDivElement> {
  readonly variant?: EmptyMediaVariant;
}

export const EmptyMedia = ({
  className,
  variant = 'default',
  ...props
}: EmptyMediaProps) => (
  <div
    className={cn('mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0', mediaClasses[variant], className)}
    data-slot="empty-media"
    data-variant={variant}
    {...props}
  />
);

export const EmptyTitle = ({className, ...props}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('text-lg font-medium tracking-tight', className)}
    data-slot="empty-title"
    {...props}
  />
);

export const EmptyDescription = ({className, ...props}: HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn('text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary', className)}
    data-slot="empty-description"
    {...props}
  />
);

export const EmptyContent = ({className, ...props}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance', className)}
    data-slot="empty-content"
    {...props}
  />
);
