import {cn} from '@nlabs/utils';
import {forwardRef} from 'react';

import {useTranslation} from '../../i18n/index.js';
import {getBackgroundClasses, getBorderClasses, getTextClasses} from '../../utils/colorUtils.js';
import {renderWithAsChild} from '../ComponentUtils/renderWithAsChild.js';

import type {ButtonHTMLAttributes, ElementType, ReactNode} from 'react';
import type {GothamColor} from '../../utils/colorUtils.js';
import type {GothamSize} from '../../utils/sizeUtils.js';

export type ButtonType = 'button' | 'reset' | 'submit';
export type ButtonVariant = 'text' | 'contained' | 'outlined';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'color' | 'onClick' | 'type'> {
  readonly as?: ElementType;
  readonly asChild?: boolean;
  readonly children?: ReactNode;
  readonly color?: GothamColor;
  readonly hasNotification?: boolean;
  readonly hasShadow?: boolean;
  readonly icon?: ReactNode;
  readonly isLoading?: boolean;
  readonly label?: string;
  readonly onClick?: (event?: unknown) => void;
  readonly size?: GothamSize;
  readonly type?: ButtonType;
  readonly variant?: ButtonVariant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  as,
  asChild = false,
  children,
  className,
  color = 'primary',
  disabled,
  hasNotification = false,
  hasShadow = false,
  icon,
  isLoading = false,
  label = '',
  onClick = () => {},
  size = 'md',
  type = 'button',
  variant,
  ...props
}, ref) => {
  const {t} = useTranslation();
  const classes: string[] = [
    'disabled:pointer-events-none',
    'disabled:opacity-50'
  ];

  if(variant) {
    classes.push(...[
      'cursor-pointer',
      'flex',
      'focus-visible:outline',
      'focus-visible:outline-2',
      'focus-visible:outline-offset-2',
      'focus-visible:outline-secondary',
      'items-center',
      'justify-center',
      'leading-6',
      'relative'
    ]);

    switch(variant) {
      case 'outlined':
        classes.push(
          'bg-transparent',
          'border-1',
          'font-semibold',
          getBorderClasses(color, {hasFocus: true, hasHover: true}),
          getTextClasses(color, {hasFocus: true, hasHover: true})
        );
        break;
      case 'text':
        classes.push(
          'bg-transparent',
          'font-semibold',
          getTextClasses(color, {hasFocus: true, hasHover: true})
        );
        break;
      case 'contained':
      default:
        classes.push(
          getBackgroundClasses(color, {hasFocus: true, hasHover: true}),
          'font-medium',
          'text-white',
          hasShadow ? 'shadow-sm' : ''
        );
        break;
    }

    switch(size) {
      case 'sm':
        classes.push(
          'px-4',
          'py-0.5',
          'rounded',
          'text-sm'
        );
        break;
      case 'lg':
        classes.push(
          'px-8',
          'py-4',
          'rounded-lg',
          'text-lg'
        );
        break;
      case 'md':
      default:
        classes.push(
          'px-6',
          'py-2',
          'rounded-md',
          'text-md'
        );
    }
  }

  let buttonIcon = icon;

  if(isLoading) {
    buttonIcon = (
      <svg className="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    );
  }

  let buttonNotification: ReactNode | null = null;

  if(hasNotification) {
    buttonNotification = (
      <span className="absolute top-0 right-0 -mt-1 -mr-1 flex size-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
      </span>
    );
  }

  const buttonContent = asChild ? children : (
    <>
      {buttonNotification}
      {buttonIcon}
      {children ? children : t(label)}
    </>
  );

  return renderWithAsChild(
    {
      as: as ?? 'button',
      asChild,
      children: buttonContent,
      className: cn(...classes, className),
      'data-testid': `button-${label || children}`,
      disabled: isLoading || disabled,
      onClick,
      ref,
      type,
      ...props
    } as never,
    {
      'data-slot': 'button',
      'data-variant': variant
    }
  );
});

Button.displayName = 'Button';
