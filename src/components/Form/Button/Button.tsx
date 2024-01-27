import {useTranslation} from 'react-i18next';
import {FC, ReactNode} from 'react';
import clsx from 'clsx';

export type ButtonType = 'button' | 'reset' | 'submit';
export type ButtonVariant = 'text' | 'contained' | 'outlined';

export interface ButtonProps {
  readonly children?: ReactNode;
  readonly className?: string;
  readonly disabled?: boolean;
  readonly isLoading?: boolean;
  readonly label?: string;
  readonly type: ButtonType;
  readonly variant?: ButtonVariant;
}

export const Button: FC<ButtonProps> = ({
  children,
  className,
  disabled,
  isLoading = false,
  label,
  type = 'button',
  variant = 'contained',
  ...restBtnProps
}) => {
  const {t} = useTranslation();

  return (
    <button
      className={clsx(className, 'flex justify-center rounded-md bg-primary-600 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600')}
      data-testid={`button-${label || children}`}
      disabled={isLoading || disabled}
      type={type}
      {...restBtnProps}>
      {(children ? children : t(label)) as string}
    </button>
  );
};
