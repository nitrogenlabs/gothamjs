import {Description as HeadlessDescription, Field as HeadlessField, Fieldset as HeadlessFieldset, Label as HeadlessLabel, Legend as HeadlessLegend} from '@headlessui/react';
import {cn} from '@nlabs/utils';

import type {ComponentPropsWithoutRef} from 'react';

export const Fieldset = ({
  className,
  ...props
}: Omit<ComponentPropsWithoutRef<typeof HeadlessFieldset>, 'as' | 'className'> & {readonly className?: string}) => (
  <HeadlessFieldset
    className={cn('*:data-[slot=text]:mt-1 [&>*+[data-slot=control]]:mt-6', className)}
    {...props}
  />
);

export const Legend = ({
  className,
  ...props
}: Omit<ComponentPropsWithoutRef<typeof HeadlessLegend>, 'as' | 'className'> & {readonly className?: string}) => (
  <HeadlessLegend
    className={cn('text-base/6 font-semibold text-foreground data-disabled:opacity-50 sm:text-sm/6 dark:text-foreground-dark', className)}
    data-slot="legend"
    {...props}
  />
);

export const FieldGroup = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) => (
  <div
    className={cn('space-y-8', className)}
    data-slot="control"
    {...props}
  />
);

export const Field = ({
  className,
  ...props
}: Omit<ComponentPropsWithoutRef<typeof HeadlessField>, 'as' | 'className'> & {readonly className?: string}) => (
  <HeadlessField
    className={cn(
      '[&>[data-slot=label]+[data-slot=control]]:mt-3',
      '[&>[data-slot=label]+[data-slot=description]]:mt-1',
      '[&>[data-slot=description]+[data-slot=control]]:mt-3',
      '[&>[data-slot=control]+[data-slot=description]]:mt-3',
      '[&>[data-slot=control]+[data-slot=error]]:mt-3',
      '*:data-[slot=label]:font-medium',
      className
    )}
    data-slot="field"
    {...props}
  />
);

export const FieldLabel = ({
  className,
  ...props
}: Omit<ComponentPropsWithoutRef<typeof HeadlessLabel>, 'as' | 'className'> & {readonly className?: string}) => (
  <HeadlessLabel
    className={cn('text-base/6 text-foreground select-none data-disabled:opacity-50 sm:text-sm/6 dark:text-foreground-dark', className)}
    data-slot="label"
    {...props}
  />
);

export const FieldDescription = ({
  className,
  ...props
}: Omit<ComponentPropsWithoutRef<typeof HeadlessDescription>, 'as' | 'className'> & {readonly className?: string}) => (
  <HeadlessDescription
    className={cn('text-base/6 text-muted-foreground data-disabled:opacity-50 sm:text-sm/6 dark:text-muted-foreground-dark', className)}
    data-slot="description"
    {...props}
  />
);

export const FieldError = ({
  className,
  ...props
}: Omit<ComponentPropsWithoutRef<typeof HeadlessDescription>, 'as' | 'className'> & {readonly className?: string}) => (
  <HeadlessDescription
    className={cn('text-base/6 text-error data-disabled:opacity-50 sm:text-sm/6 dark:text-error-dark', className)}
    data-slot="error"
    {...props}
  />
);
