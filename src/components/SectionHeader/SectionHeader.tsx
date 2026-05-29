import {cn} from '@nlabs/utils';

import type {HTMLAttributes, ReactNode} from 'react';

export interface SectionHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  readonly actions?: ReactNode;
  readonly align?: 'left' | 'center';
  readonly eyebrow?: ReactNode;
  readonly subtitle?: ReactNode;
  readonly title: ReactNode;
}

export const SectionHeader = ({
  actions,
  align = 'left',
  children,
  className,
  eyebrow,
  subtitle,
  title,
  ...props
}: SectionHeaderProps) => {
  const actionClasses = actions && align === 'left'
    ? 'sm:max-w-none sm:flex-row sm:items-end sm:justify-between'
    : '';

  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'mx-auto max-w-3xl items-center text-center' : 'max-w-3xl',
        actionClasses,
        className
      )}
      data-slot="section-header"
      {...props}
    >
      <div className={cn('min-w-0', align === 'center' && 'flex flex-col items-center')}>
        {eyebrow ? (
          <p className="text-sm/6 font-semibold text-primary dark:text-primary-dark">{eyebrow}</p>
        ) : null}
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl dark:text-foreground-dark">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-4 text-base/7 text-muted-foreground dark:text-muted-foreground-dark">{subtitle}</p>
        ) : null}
        {children}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-3">{actions}</div> : null}
    </div>
  );
};
