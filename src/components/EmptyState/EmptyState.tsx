import {cn} from '@nlabs/utils';

import {Button} from '../Button/Button.js';

import type {ButtonProps} from '../Button/Button.js';
import type {ReactNode} from 'react';

export interface EmptyStateProps {
  readonly action?: ReactNode;
  readonly actionClassName?: string;
  readonly actionIcon?: ReactNode;
  readonly actionLabel?: string;
  readonly actionProps?: Omit<ButtonProps, 'children' | 'icon' | 'label' | 'onClick' | 'variant'>;
  readonly className?: string;
  readonly description: string;
  readonly icon?: ReactNode;
  readonly onAction?: () => void;
  readonly title: string;
}

const defaultIcon = (
  <svg
    aria-hidden="true"
    className="mx-auto size-12 text-gray-400 dark:text-gray-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);

export const EmptyState = ({
  action,
  actionClassName,
  actionIcon,
  actionLabel,
  actionProps,
  className,
  description,
  icon = defaultIcon,
  onAction,
  title
}: EmptyStateProps) => (
  <div className={cn('flex flex-col items-center text-center', className)}>
    {icon}
    <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">{title}</h3>
    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
    {(action || actionLabel) && (
      <div className="mt-6 flex justify-center">
        {action || (
          <Button
            className={actionClassName}
            icon={actionIcon}
            label={actionLabel}
            onClick={onAction}
            variant="contained"
            {...actionProps}
          />
        )}
      </div>
    )}
  </div>
);
