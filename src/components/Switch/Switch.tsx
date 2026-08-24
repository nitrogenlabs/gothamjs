import {Field as HeadlessField} from '@headlessui/react';
import {cn} from '@nlabs/utils';

import type {ComponentPropsWithoutRef, FC, HTMLAttributes, InputHTMLAttributes} from 'react';
import type {GothamColor} from '../../utils/colorUtils.js';

const switchBackgroundClasses: Record<GothamColor, string> = {
  black: 'peer-checked:bg-black dark:peer-checked:bg-black-dark',
  error: 'peer-checked:bg-error dark:peer-checked:bg-error-dark',
  info: 'peer-checked:bg-info dark:peer-checked:bg-info-dark',
  link: 'peer-checked:bg-link dark:peer-checked:bg-link-dark',
  neutral: 'peer-checked:bg-neutral dark:peer-checked:bg-neutral-dark',
  primary: 'peer-checked:bg-primary dark:peer-checked:bg-primary-dark',
  secondary: 'peer-checked:bg-secondary dark:peer-checked:bg-secondary-dark',
  success: 'peer-checked:bg-success dark:peer-checked:bg-success-dark',
  tertiary: 'peer-checked:bg-tertiary dark:peer-checked:bg-tertiary-dark',
  transparent: 'peer-checked:bg-transparent',
  warning: 'peer-checked:bg-warning dark:peer-checked:bg-warning-dark',
  white: 'peer-checked:bg-white dark:peer-checked:bg-white-dark'
};

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  readonly color?: GothamColor;
  readonly onCheckedChange?: (checked: boolean) => void;
}

export const Switch: FC<SwitchProps> = ({
  className,
  color = 'primary',
  disabled,
  onCheckedChange,
  onChange,
  ...props
}) => (
  <label
    className={cn('relative isolate inline-flex h-6 w-10 rounded-full sm:h-5 sm:w-8', className)}
    data-slot="switch"
  >
      <input
        className="peer absolute inset-0 size-full cursor-pointer appearance-none rounded-full disabled:cursor-not-allowed"
        disabled={disabled}
      onChange={(event) => {
        onChange?.(event);
        onCheckedChange?.(event.currentTarget.checked);
      }}
      role="switch"
      type="checkbox"
      {...props}
    />
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 rounded-full bg-black/15 ring-1 ring-black/20 ring-inset transition-colors peer-checked:ring-transparent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring peer-disabled:opacity-50 dark:bg-white/25 dark:ring-white/25 dark:peer-focus-visible:outline-ring-dark',
        switchBackgroundClasses[color]
      )}
    />
    <span
      aria-hidden="true"
      className="pointer-events-none relative m-[3px] inline-block size-4.5 rounded-full border border-transparent bg-white shadow-sm ring-1 ring-black/5 transition-transform peer-checked:translate-x-4 peer-disabled:opacity-50 sm:size-3.5 sm:peer-checked:translate-x-3 dark:bg-foreground-dark"
    />
  </label>
);

export const SwitchGroup = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('space-y-3 has-data-[slot=description]:space-y-6', className)}
    data-slot="control"
    {...props}
  />
);

export const SwitchField = ({
  className,
  ...props
}: Omit<ComponentPropsWithoutRef<typeof HeadlessField>, 'as' | 'className'> & {readonly className?: string}) => (
  <HeadlessField
    className={cn(
      'grid grid-cols-[1fr_auto] gap-x-8 gap-y-1',
      '*:data-[slot=switch]:col-start-2 *:data-[slot=switch]:row-start-1 *:data-[slot=switch]:self-start',
      '*:data-[slot=label]:col-start-1 *:data-[slot=label]:row-start-1',
      '*:data-[slot=description]:col-start-1 *:data-[slot=description]:row-start-2',
      className
    )}
    data-slot="field"
    {...props}
  />
);
