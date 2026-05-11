import {cn} from '@nlabs/utils';

import {renderWithAsChild} from '../ComponentUtils/renderWithAsChild.js';
import {Separator, SeparatorProps} from '../Separator/Separator.js';

import type {ElementType, HTMLAttributes, ReactNode} from 'react';

export type ItemVariant = 'default' | 'outline' | 'muted';
export type ItemSize = 'default' | 'sm';
export type ItemMediaVariant = 'default' | 'icon' | 'image';

const itemVariantClasses: Record<ItemVariant, string> = {
  default: 'bg-transparent',
  muted: 'bg-muted/50',
  outline: 'border-border'
};

const itemSizeClasses: Record<ItemSize, string> = {
  default: 'gap-4 p-4',
  sm: 'gap-2.5 px-4 py-3'
};

const mediaVariantClasses: Record<ItemMediaVariant, string> = {
  default: 'bg-transparent',
  icon: 'size-8 rounded-sm border border-border bg-muted [&_svg:not([class*=size-])]:size-4',
  image: 'size-10 overflow-hidden rounded-sm [&_img]:size-full [&_img]:object-cover'
};

export const ItemGroup = ({className, ...props}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('group/item-group flex flex-col', className)}
    data-slot="item-group"
    role="list"
    {...props}
  />
);

export const ItemSeparator = ({className, ...props}: SeparatorProps) => (
  <Separator
    className={cn('my-0', className)}
    data-slot="item-separator"
    orientation="horizontal"
    {...props}
  />
);

export interface ItemProps extends HTMLAttributes<HTMLElement> {
  readonly as?: ElementType;
  readonly asChild?: boolean;
  readonly children?: ReactNode;
  readonly size?: ItemSize;
  readonly variant?: ItemVariant;
}

export const Item = ({
  as,
  asChild = false,
  children,
  className,
  size = 'default',
  variant = 'default',
  ...props
}: ItemProps) => renderWithAsChild(
  {
    as: as ?? 'div',
    asChild,
    children,
    className: cn(
      'group/item flex flex-wrap items-center rounded-md border border-transparent text-sm transition-colors duration-100 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors [a]:hover:bg-accent/50',
      itemVariantClasses[variant],
      itemSizeClasses[size],
      className
    ),
    ...props
  },
  {
    'data-size': size,
    'data-slot': 'item',
    'data-variant': variant
  }
);

export interface ItemMediaProps extends HTMLAttributes<HTMLDivElement> {
  readonly variant?: ItemMediaVariant;
}

export const ItemMedia = ({
  className,
  variant = 'default',
  ...props
}: ItemMediaProps) => (
  <div
    className={cn(
      'flex shrink-0 items-center justify-center gap-2 self-start [&_svg]:pointer-events-none',
      mediaVariantClasses[variant],
      className
    )}
    data-slot="item-media"
    data-variant={variant}
    {...props}
  />
);

export const ItemContent = ({className, ...props}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none', className)}
    data-slot="item-content"
    {...props}
  />
);

export const ItemTitle = ({className, ...props}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex w-fit items-center gap-2 text-sm leading-snug font-medium', className)}
    data-slot="item-title"
    {...props}
  />
);

export const ItemDescription = ({className, ...props}: HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn('line-clamp-2 text-sm leading-normal font-normal text-balance text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary', className)}
    data-slot="item-description"
    {...props}
  />
);

export const ItemActions = ({className, ...props}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex items-center gap-2', className)}
    data-slot="item-actions"
    {...props}
  />
);

export const ItemHeader = ({className, ...props}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex basis-full items-center justify-between gap-2', className)}
    data-slot="item-header"
    {...props}
  />
);

export const ItemFooter = ({className, ...props}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex basis-full items-center justify-between gap-2', className)}
    data-slot="item-footer"
    {...props}
  />
);
