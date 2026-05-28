import {cn} from '@nlabs/utils';
import {Menu, X} from 'lucide-react';
import {forwardRef, useEffect, useState} from 'react';

import {renderWithAsChild} from '../ComponentUtils/renderWithAsChild.js';

import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ElementType,
  HTMLAttributes,
  ReactNode
} from 'react';

const getTransparentScrollThreshold = (threshold: number) => (
  threshold > 1 ? threshold : window.innerHeight * threshold
);

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  readonly as?: ElementType;
  readonly asChild?: boolean;
  readonly children?: ReactNode;
  readonly isSticky?: boolean;
  readonly mobileMenu?: ReactNode;
  readonly mobileMenuLabel?: string;
  readonly mobileMenuTitle?: ReactNode;
  readonly transparentOnScroll?: boolean;
  readonly transparentScrollThreshold?: number;
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
  isSticky = false,
  mobileMenu,
  mobileMenuLabel = 'Open navigation menu',
  mobileMenuTitle = 'Navigation',
  transparentOnScroll = false,
  transparentScrollThreshold = 0.1,
  ...props
}, ref) => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if(!transparentOnScroll) return undefined;

    const onScroll = () => {
      const threshold = getTransparentScrollThreshold(transparentScrollThreshold);

      setIsAtTop(window.scrollY < threshold);
    };

    onScroll();
    window.addEventListener('resize', onScroll, {passive: true});
    window.addEventListener('scroll', onScroll, {passive: true});

    return () => {
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('scroll', onScroll);
    };
  }, [transparentOnScroll, transparentScrollThreshold]);

  useEffect(() => {
    if(!isMobileMenuOpen) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if(event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen]);

  const renderedChildren = (
    <>
      {children}
      {mobileMenu ? (
        <>
          <button
            aria-controls="gotham-navbar-mobile-menu"
            aria-expanded={isMobileMenuOpen}
            aria-label={mobileMenuLabel}
            className="ml-auto inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-md border border-current/15 bg-transparent text-current transition-colors hover:bg-current/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current lg:hidden"
            data-slot="navbar-mobile-trigger"
            onClick={() => setIsMobileMenuOpen((value) => !value)}
            type="button">
            <Menu aria-hidden="true" className="size-5" />
          </button>
          <div
            aria-hidden={!isMobileMenuOpen}
            className={cn(
              'fixed inset-0 z-50 bg-black/35 opacity-0 backdrop-blur-sm transition-opacity duration-200 lg:hidden',
              isMobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none'
            )}
            data-slot="navbar-mobile-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside
            aria-label="Mobile navigation"
            className={cn(
              'fixed inset-y-0 right-0 z-50 grid w-[min(86vw,22rem)] grid-rows-[auto_1fr] gap-4 border-l border-border bg-background p-5 text-foreground shadow-2xl transition-transform duration-200 lg:hidden',
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            )}
            data-slot="navbar-mobile-menu"
            id="gotham-navbar-mobile-menu">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 text-base font-semibold">{mobileMenuTitle}</div>
              <button
                aria-label="Close navigation menu"
                className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md border border-border bg-transparent text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                data-slot="navbar-mobile-close"
                onClick={() => setIsMobileMenuOpen(false)}
                type="button">
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>
            <div className="min-h-0 overflow-y-auto" onClick={() => setIsMobileMenuOpen(false)}>
              {mobileMenu}
            </div>
          </aside>
        </>
      ) : null}
    </>
  );

  return renderWithAsChild(
    {
      as,
      asChild,
      children: renderedChildren,
      className: cn(
        'flex min-h-14 w-full items-center gap-3 border-b border-border bg-background px-4 text-sm text-foreground sm:px-6',
        isSticky && 'sticky top-0 z-40',
        transparentOnScroll && [
          'inset-x-0 top-0 z-40 border-transparent bg-transparent text-white transition-[background-color,backdrop-filter,border-color,color] duration-200',
          isSticky ? 'sticky' : 'fixed',
          'data-[scroll-state=scrolled]:border-border/70 data-[scroll-state=scrolled]:bg-background/80 data-[scroll-state=scrolled]:text-foreground data-[scroll-state=scrolled]:backdrop-blur-md'
        ],
        className
      ),
      'data-sticky': isSticky ? 'true' : undefined,
      'data-scroll-state': transparentOnScroll ? (isAtTop ? 'at-top' : 'scrolled') : undefined,
      'data-transparent-on-scroll': transparentOnScroll ? 'true' : undefined,
      ref,
      ...props
    } as never,
    {
      'data-slot': 'navbar'
    }
  );
});

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
