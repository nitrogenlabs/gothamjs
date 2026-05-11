import {cn} from '@nlabs/utils';
import {forwardRef} from 'react';

import {renderWithAsChild} from '../ComponentUtils/renderWithAsChild.js';

import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ElementType,
  HTMLAttributes,
  ReactNode
} from 'react';

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  readonly as?: ElementType;
  readonly asChild?: boolean;
  readonly children?: ReactNode;
}

export interface NavbarSectionProps extends HTMLAttributes<HTMLDivElement> {
  readonly children?: ReactNode;
}

export interface NavbarItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'type'> {
  readonly as?: ElementType;
  readonly asChild?: boolean;
  readonly children?: ReactNode;
  readonly current?: boolean;
  readonly href?: AnchorHTMLAttributes<HTMLAnchorElement>['href'];
  readonly type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export const Navbar = forwardRef<HTMLElement, NavbarProps>(({
  as = 'nav',
  asChild = false,
  children,
  className,
  ...props
}, ref) => renderWithAsChild(
  {
    as,
    asChild,
    children,
    className: cn(
      'flex min-h-14 w-full items-center gap-3 border-b border-border bg-background px-4 text-sm text-foreground sm:px-6',
      className
    ),
    ref,
    ...props
  } as never,
  {
    'data-slot': 'navbar'
  }
));

Navbar.displayName = 'Navbar';

export const NavbarSection = forwardRef<HTMLDivElement, NavbarSectionProps>(({
  children,
  className,
  ...props
}, ref) => (
  <div
    className={cn('flex min-w-0 items-center gap-1.5', className)}
    data-slot="navbar-section"
    ref={ref}
    {...props}
  >
    {children}
  </div>
));

NavbarSection.displayName = 'NavbarSection';

export const NavbarItem = forwardRef<HTMLElement, NavbarItemProps>(({
  as,
  asChild = false,
  children,
  className,
  current = false,
  href,
  type = 'button',
  ...props
}, ref) => {
  const component = as ?? (href ? 'a' : 'button');

  return renderWithAsChild(
    {
      as: component,
      asChild,
      children,
      className: cn(
        'group/navbar-item relative inline-flex min-h-9 shrink-0 cursor-pointer items-center gap-2 rounded-md px-3 py-2 font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[current=true]:text-foreground [&>svg]:size-5 [&>svg]:shrink-0',
        current && 'after:absolute after:inset-x-3 after:-bottom-[9px] after:h-0.5 after:rounded-full after:bg-current',
        className
      ),
      'aria-current': current ? 'page' : undefined,
      'data-current': current ? 'true' : undefined,
      href,
      ref,
      type: href ? undefined : type,
      ...props
    } as never,
    {
      'data-slot': 'navbar-item'
    }
  );
});

NavbarItem.displayName = 'NavbarItem';

export const NavbarLabel = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(({
  className,
  ...props
}, ref) => (
  <span
    className={cn('truncate', className)}
    data-slot="navbar-label"
    ref={ref}
    {...props}
  />
));

NavbarLabel.displayName = 'NavbarLabel';

export const NavbarSpacer = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({
  className,
  ...props
}, ref) => (
  <div
    aria-hidden="true"
    className={cn('min-w-4 flex-1', className)}
    data-slot="navbar-spacer"
    ref={ref}
    {...props}
  />
));

NavbarSpacer.displayName = 'NavbarSpacer';

export const NavbarDivider = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({
  className,
  ...props
}, ref) => (
  <div
    aria-hidden="true"
    className={cn('mx-2 h-6 w-px shrink-0 bg-border', className)}
    data-slot="navbar-divider"
    ref={ref}
    {...props}
  />
));

NavbarDivider.displayName = 'NavbarDivider';
