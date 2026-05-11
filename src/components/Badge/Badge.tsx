import {cn} from '@nlabs/utils';

import {renderWithAsChild} from '../ComponentUtils/renderWithAsChild.js';

import type {ElementType, HTMLAttributes, ReactNode} from 'react';

export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';

export interface BadgeProps extends HTMLAttributes<HTMLElement> {
  readonly as?: ElementType;
  readonly asChild?: boolean;
  readonly children?: ReactNode;
  readonly variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
  destructive: 'bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90',
  ghost: '[a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 [a&]:hover:underline',
  outline: 'border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
  secondary: 'bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90'
};

export const Badge = ({
  as,
  asChild = false,
  children,
  className,
  variant = 'default',
  ...props
}: BadgeProps) => renderWithAsChild(
  {
    as: as ?? 'span',
    asChild,
    children,
    className: cn(
      'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3',
      variantClasses[variant],
      className
    ),
    ...props
  },
  {
    'data-slot': 'badge',
    'data-variant': variant
  }
);
