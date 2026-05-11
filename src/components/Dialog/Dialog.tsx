import {
  Dialog as HeadlessDialog,
  DialogPanel,
  DialogTitle as HeadlessDialogTitle,
  Description
} from '@headlessui/react';
import {cn} from '@nlabs/utils';
import {forwardRef} from 'react';

import type {HTMLAttributes, ReactNode} from 'react';

export type DialogSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';

const dialogSizeClasses: Record<DialogSize, string> = {
  '2xl': 'sm:max-w-2xl',
  '3xl': 'sm:max-w-3xl',
  '4xl': 'sm:max-w-4xl',
  '5xl': 'sm:max-w-5xl',
  lg: 'sm:max-w-lg',
  md: 'sm:max-w-md',
  sm: 'sm:max-w-sm',
  xl: 'sm:max-w-xl',
  xs: 'sm:max-w-xs'
};

export interface DialogProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClose'> {
  readonly children?: ReactNode;
  readonly open: boolean;
  readonly onClose: (open: boolean) => void;
  readonly size?: DialogSize;
}

export const Dialog = ({
  children,
  className,
  onClose,
  open,
  size = 'lg',
  ...props
}: DialogProps) => (
  <HeadlessDialog className="relative z-50" data-slot="dialog" onClose={onClose} open={open}>
    <div className="fixed inset-0 bg-zinc-900/45 backdrop-blur-md" data-slot="dialog-backdrop" />
    <div className="fixed inset-0 w-screen overflow-y-auto p-4 sm:p-6 md:p-8" data-slot="dialog-scroll-container">
      <div className="flex min-h-full items-end justify-center sm:items-center" data-slot="dialog-container">
        <DialogPanel
          className={cn(
            'w-full rounded-2xl border border-white/70 bg-white/95 p-6 shadow-2xl shadow-zinc-950/25 ring-1 ring-zinc-950/5 backdrop-blur-xl sm:p-7 dark:border-white/10 dark:bg-zinc-900/95 dark:ring-white/10',
            dialogSizeClasses[size],
            className
          )}
          data-slot="dialog-panel"
          {...props}
        >
          {children}
        </DialogPanel>
      </div>
    </div>
  </HeadlessDialog>
);

export const DialogTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(({
  className,
  ...props
}, ref) => (
  <HeadlessDialogTitle
    className={cn('text-lg font-semibold tracking-tight text-zinc-950 dark:text-white', className)}
    data-slot="dialog-title"
    ref={ref}
    {...props}
  />
));

DialogTitle.displayName = 'DialogTitle';

export const DialogDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(({
  className,
  ...props
}, ref) => (
  <Description
    className={cn('mt-2 text-sm/6 text-zinc-600 dark:text-zinc-400', className)}
    data-slot="dialog-description"
    ref={ref}
    {...props}
  />
));

DialogDescription.displayName = 'DialogDescription';

export const DialogBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({
  className,
  ...props
}, ref) => (
  <div
    className={cn('mt-6 max-h-[65vh] overflow-y-auto text-sm/6 text-zinc-950 dark:text-white', className)}
    data-slot="dialog-body"
    ref={ref}
    {...props}
  />
));

DialogBody.displayName = 'DialogBody';

export const DialogActions = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({
  className,
  ...props
}, ref) => (
  <div
    className={cn('mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end', className)}
    data-slot="dialog-actions"
    ref={ref}
    {...props}
  />
));

DialogActions.displayName = 'DialogActions';
