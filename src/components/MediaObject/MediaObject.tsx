import {cn} from '@nlabs/utils';

import type {HTMLAttributes, ReactNode} from 'react';

export interface MediaObjectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  readonly align?: 'start' | 'center' | 'end' | 'stretch';
  readonly description?: ReactNode;
  readonly media: ReactNode;
  readonly title?: ReactNode;
}

const alignClasses: Record<NonNullable<MediaObjectProps['align']>, string> = {
  center: 'items-center',
  end: 'items-end',
  start: 'items-start',
  stretch: 'items-stretch'
};

export const MediaObject = ({
  align = 'start',
  children,
  className,
  description,
  media,
  title,
  ...props
}: MediaObjectProps) => (
  <div className={cn('flex gap-4', alignClasses[align], className)} data-slot="media-object" {...props}>
    <div className="shrink-0" data-slot="media-object-media">{media}</div>
    <div className="min-w-0 flex-1" data-slot="media-object-content">
      {title ? <h3 className="text-base font-semibold text-foreground dark:text-foreground-dark">{title}</h3> : null}
      {description ? <p className="mt-1 text-sm/6 text-muted-foreground dark:text-muted-foreground-dark">{description}</p> : null}
      {children}
    </div>
  </div>
);
