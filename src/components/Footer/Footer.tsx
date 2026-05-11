import {cn} from '@nlabs/utils';

import type {ReactNode} from 'react';

export interface FooterLink {
  readonly href: string;
  readonly label: string;
}

export interface FooterProps {
  readonly brand?: ReactNode;
  readonly className?: string;
  readonly copyright?: string;
  readonly links?: readonly FooterLink[];
  readonly supportEmail?: string;
  readonly supportLabel?: string;
}

export const Footer = ({
  brand,
  className,
  copyright,
  links = [],
  supportEmail = '',
  supportLabel = 'Support'
}: FooterProps) => {
  const hasSupportEmail = Boolean(String(supportEmail || '').trim());

  return (
    <footer className={cn('border-t border-gray-900/8 bg-white/70 backdrop-blur-sm dark:border-white/8 dark:bg-gray-900/70', className)}>
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center">
            {brand}
          </div>
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {links.map((item) => (
              <a
                className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                href={item.href}
                key={`${item.label}-${item.href}`}
              >
                {item.label}
              </a>
            ))}
            {hasSupportEmail ? (
              <a
                className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                href={`mailto:${supportEmail}`}
              >
                {supportLabel}
              </a>
            ) : null}
          </nav>
        </div>
        {copyright ? (
          <div className="border-t border-gray-900/8 pt-4 dark:border-white/8">
            <p className="text-xs text-gray-500 dark:text-gray-400">{copyright}</p>
          </div>
        ) : null}
      </div>
    </footer>
  );
};

export default Footer;
