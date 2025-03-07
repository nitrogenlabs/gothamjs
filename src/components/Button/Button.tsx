import clsx from 'clsx';
import {forwardRef, ReactNode} from 'react';
import {useTranslation} from 'react-i18next';

import type {GothamColor, GothamColorTone} from '../../utils/colorUtils';
import type {GothamSize} from '../../utils/sizeUtils';

export type ButtonType = 'button' | 'reset' | 'submit';
export type ButtonVariant = 'text' | 'contained' | 'outlined';

export interface ButtonProps {
  readonly children?: ReactNode;
  readonly className?: string;
  readonly color?: GothamColor;
  readonly disabled?: boolean;
  readonly hideShadow?: boolean;
  readonly isLoading?: boolean;
  readonly label?: string;
  readonly onClick?: (event?: unknown) => void;
  readonly size?: GothamSize;
  readonly tabIndex?: number;
  readonly tone?: GothamColorTone;
  readonly toneAlt?: GothamColorTone;
  readonly type?: ButtonType;
  readonly variant?: ButtonVariant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  className,
  color = 'primary',
  disabled,
  hideShadow = false,
  isLoading = false,
  label,
  onClick = () => {},
  size = 'md',
  tone = 500,
  toneAlt = 100,
  type = 'button',
  variant,
  ...restBtnProps
}, ref) => {
  const {t} = useTranslation();
  const classes = [];

  if(variant) {
    classes.push(...[
      'flex',
      'justify-center',
      'font-semibold',
      'leading-6',
      'text-white',
      'hover:bg-indigo-500',
      'focus-visible:outline',
      'focus-visible:outline-2',
      'focus-visible:outline-offset-2',
      'focus-visible:outline-indigo-600'
    ]);

    switch(variant) {
      case 'outlined':
        classes.push(
          `border-${color}-${tone}`,
          `text-${color}-${tone}`
        );
        break;
      case 'text':
        classes.push(
          `text-${color}-${tone}`
        );
        break;
      case 'contained':
        classes.push(
          `bg-${color}-${tone}`,
          `text-${color}-${toneAlt}`,
          !hideShadow ? 'shadow-sm' : ''
        );
        break;
      default:
        break;
    }

    switch(size) {
      case 'sm':
        classes.push(
          'border',
          'px-4',
          'py-0.5',
          'rounded',
          'text-sm'
        );
        break;
      case 'lg':
        classes.push(
          'border-2',
          'px-6',
          'py-2',
          'rounded-lg',
          'text-lg'
        );
        break;
      case 'md':
      default:
        classes.push(
          'border',
          'px-5',
          'py-1',
          'rounded-md',
          'text-md'
        );
    }
  }

  return (
    <button
      className={clsx(...classes, className)}
      data-testid={`button-${label || children}`}
      disabled={isLoading || disabled}
      onClick={onClick}
      ref={ref}
      type={type}
      {...restBtnProps}>
      {(children ? children : t(label)) as string}
    </button>
  );
});
