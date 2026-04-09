import {cn} from '@nlabs/utils';
import {ChevronRight, House} from 'lucide-react';

import type {AnchorHTMLAttributes, ComponentType, ReactElement, SVGProps} from 'react';

export type BreadcrumbsVariant = 'contained' | 'chevrons' | 'full';

export interface BreadcrumbItem {
  readonly current?: boolean;
  readonly href?: string;
  readonly label: string;
}

export interface BreadcrumbsProps {
  readonly className?: string;
  readonly homeAriaLabel?: string;
  readonly homeHref?: string;
  readonly homeIcon?: ComponentType<SVGProps<SVGSVGElement>>;
  readonly homeLabel?: string;
  readonly itemClassName?: string;
  readonly items: readonly BreadcrumbItem[];
  readonly linkComponent?: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => ReactElement;
  readonly variant?: BreadcrumbsVariant;
}

const DefaultLink = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props} />;

export const Breadcrumbs = ({
  className,
  homeAriaLabel = 'Home',
  homeHref = '#',
  homeIcon: HomeIcon = House,
  homeLabel = 'Home',
  itemClassName,
  items,
  linkComponent: LinkComponent = DefaultLink,
  variant = 'contained'
}: BreadcrumbsProps) => {
  if(items.length === 0) {
    return null;
  }

  const listClassName = variant === 'contained'
    ? 'flex space-x-4 rounded-md bg-white px-6 shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10'
    : variant === 'full'
      ? 'mx-auto flex w-full max-w-(--breakpoint-xl) space-x-4 px-4 sm:px-6 lg:px-8'
      : 'flex items-center space-x-4';

  const navClassName = variant === 'full'
    ? 'flex border-b border-gray-200 bg-white dark:border-white/10 dark:bg-gray-800/50'
    : 'flex';

  const homeLinkClassName = variant === 'chevrons'
    ? 'text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-300'
    : 'text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300';

  const separatorClassName = variant === 'chevrons'
    ? 'size-5 shrink-0 text-gray-400 dark:text-gray-500'
    : 'h-full w-6 shrink-0 text-gray-200 dark:text-white/10';

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(navClassName, className)}
    >
      <ol
        role="list"
        className={listClassName}
      >
        <li className="flex">
          <div className="flex items-center">
            <LinkComponent
              aria-label={homeAriaLabel}
              className={homeLinkClassName}
              href={homeHref}
            >
              <HomeIcon
                aria-hidden="true"
                className="size-5 shrink-0"
              />
              <span className="sr-only">{homeLabel}</span>
            </LinkComponent>
          </div>
        </li>

        {items.map((item, index) => {
          const isCurrent = item.current ?? index === items.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              className={cn('flex', itemClassName)}
            >
              <div className="flex items-center">
                <ChevronRight
                  aria-hidden="true"
                  className={separatorClassName}
                  strokeWidth={1.5}
                />

                {item.href ? (
                  <LinkComponent
                    aria-current={isCurrent ? 'page' : undefined}
                    className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    href={item.href}
                  >
                    {item.label}
                  </LinkComponent>
                ) : (
                  <span
                    aria-current={isCurrent ? 'page' : undefined}
                    className="ml-4 text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    {item.label}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
