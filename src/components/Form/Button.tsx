import MaterialButton, {ButtonProps as MaterialButtonProps} from '@mui/material/Button';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import React from 'react';
import {useTranslation} from 'react-i18next';

import {colorLuminance} from '../../utils/colorUtils';
import {ButtonSpinner} from './ButtonSpinner';

const useStyles = makeStyles((theme: any) => ({
  contained: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: colorLuminance(theme.palette.primary.main, 0.3)
    }
  },
  containedDark: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
    '&:hover': {
      backgroundColor: colorLuminance(theme.palette.primary.dark, 0.3),
      color: colorLuminance(theme.palette.primary.light, 0.3)
    }
  },
  containedLight: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.dark,
    '&:hover': {
      backgroundColor: colorLuminance(theme.palette.primary.light, -0.15),
      color: colorLuminance(theme.palette.primary.dark, -0.15)
    }
  },
  outlined: {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    '&:hover': {
      borderColor: colorLuminance(theme.palette.primary.main, 0.3),
      color: colorLuminance(theme.palette.primary.main, 0.3)
    }
  },
  outlinedDark: {
    borderColor: theme.palette.primary.dark,
    color: theme.palette.primary.dark,
    '&:hover': {
      borderColor: colorLuminance(theme.palette.primary.dark, 0.3),
      color: colorLuminance(theme.palette.primary.dark, 0.3)
    }
  },
  outlinedLight: {
    borderColor: theme.palette.primary.light,
    color: theme.palette.primary.light,
    '&:hover': {
      borderColor: colorLuminance(theme.palette.primary.light, -0.15),
      color: colorLuminance(theme.palette.primary.light, -0.15)
    }
  }
}));

export interface ButtonProps extends MaterialButtonProps {
  readonly isLoading?: boolean;
  readonly label?: string;
  readonly type?: 'button' | 'reset' | 'submit';
  readonly variant?: 'text' | 'outlined' | 'contained';
}

export type ButtonVariant = 'text' | 'contained' | 'containedDark' | 'containedLight' | 'outlined' | 'outlinedDark' | 'outlinedLight';

export const Button = ({children, className, isLoading = false, label, ...buttonProps}: ButtonProps) => {
  const {variant = 'contained', ...restBtnProps} = buttonProps;
  const classes = useStyles();
  const {t} = useTranslation();
  const buttonCls = clsx(classes[variant], className);
  const variantType: any = ['contained', 'outlined', 'text']
    .reduce((selectedVariant: ButtonVariant, type: ButtonVariant): ButtonVariant => {
      if(variant.includes(type)) {
        return type;
      }

      return selectedVariant;
    }, 'contained') as ButtonVariant;

  return (
    <MaterialButton {...restBtnProps} data-testid={`button-${label}`} variant={variantType} className={buttonCls} >
      {children ? children : t(label)}
      {isLoading && <ButtonSpinner />}
    </MaterialButton >
  );
};

