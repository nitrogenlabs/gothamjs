import {cn} from '@nlabs/utils';

import {CreditCard} from '../../icons/index.js';
import {Button} from '../Button/Button.js';
import {Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle} from '../Empty/Empty.js';

import type {HTMLAttributes, ReactNode} from 'react';

export interface PaymentMethodPanelProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  readonly actionIcon?: ReactNode;
  readonly addLabel?: string;
  readonly brand?: string;
  readonly description?: ReactNode;
  readonly emptyDescription?: ReactNode;
  readonly emptyTitle?: ReactNode;
  readonly isAdding?: boolean;
  readonly isRemoving?: boolean;
  readonly last4?: string;
  readonly onAdd: () => void;
  readonly onRemove?: () => void;
  readonly removeLabel?: string;
  readonly replaceLabel?: string;
  readonly title?: ReactNode;
}

export const PaymentMethodPanel = (paymentMethodPanelProps: PaymentMethodPanelProps) => {
  const {
    actionIcon = <CreditCard aria-hidden="true" size={18} />,
    addLabel = 'Add payment method',
    brand = '',
    className,
    description = 'Payment details are collected and stored by the payment provider.',
    emptyDescription = 'Add a payment method to enable purchases and subscriptions.',
    emptyTitle = 'No payment method saved',
    isAdding = false,
    isRemoving = false,
    last4 = '',
    onAdd,
    onRemove,
    removeLabel = 'Remove',
    replaceLabel = 'Replace payment method',
    title = 'Payment method',
    ...props
  } = paymentMethodPanelProps;
  const accessibleTitle = typeof title === 'string' ? title : 'Payment method';
  const hasPaymentMethod = Boolean(brand.trim() || last4.trim());
  const paymentMethodLabel = [brand.trim(), last4.trim() ? `ending in ${last4.trim()}` : '']
    .filter(Boolean)
    .join(' ');

  return (
    <section
      aria-label={accessibleTitle}
      className={cn('rounded-2xl bg-card p-5 text-card-foreground', className)}
      data-slot="payment-method-panel"
      {...props}>
      <header className="mb-6 grid gap-2">
        <h2 className="m-0 text-2xl font-semibold">{title}</h2>
        {description ? <p className="m-0 text-sm leading-relaxed text-muted-foreground">{description}</p> : null}
      </header>

      {hasPaymentMethod ? (
        <div aria-live="polite" className="grid gap-5">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CreditCard aria-hidden="true" size={20} />
            </span>
            <strong className="text-lg font-semibold capitalize">{paymentMethodLabel}</strong>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              disabled={isAdding || isRemoving}
              icon={actionIcon}
              isLoading={isAdding}
              onClick={onAdd}
              type="button">
              {replaceLabel}
            </Button>
            {onRemove ? (
              <Button
                disabled={isAdding || isRemoving}
                isLoading={isRemoving}
                onClick={onRemove}
                type="button"
                variant="outline">
                {removeLabel}
              </Button>
            ) : null}
          </div>
        </div>
      ) : (
        <Empty className="border-border/70 bg-muted/20">
          <EmptyHeader>
            <EmptyMedia variant="icon"><CreditCard aria-hidden="true" /></EmptyMedia>
            <EmptyTitle>{emptyTitle}</EmptyTitle>
            <EmptyDescription>{emptyDescription}</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              disabled={isAdding}
              icon={actionIcon}
              isLoading={isAdding}
              onClick={onAdd}
              type="button">
              {addLabel}
            </Button>
          </EmptyContent>
        </Empty>
      )}
    </section>
  );
};
