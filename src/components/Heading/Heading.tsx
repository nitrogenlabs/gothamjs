import {cn} from '@nlabs/utils';

import type {ComponentPropsWithoutRef} from 'react';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingProps = {
  readonly level?: HeadingLevel;
} & ComponentPropsWithoutRef<'h1'>;

export const Heading = ({
  className,
  level = 1,
  ...props
}: HeadingProps) => {
  const Element = `h${level}` as const;

  return (
    <Element
      className={cn('text-2xl/8 font-semibold text-foreground sm:text-xl/8 dark:text-foreground-dark', className)}
      data-slot="heading"
      {...props}
    />
  );
};

export const Subheading = ({
  className,
  level = 2,
  ...props
}: HeadingProps) => {
  const Element = `h${level}` as const;

  return (
    <Element
      className={cn('text-base/7 font-semibold text-foreground sm:text-sm/6 dark:text-foreground-dark', className)}
      data-slot="subheading"
      {...props}
    />
  );
};
