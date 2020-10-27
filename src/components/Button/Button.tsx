/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import MaterialButton from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/styles';
import classNames from 'classnames';
import React from 'react';

import {colorLuminance} from '../../utils/colorUtils';
import {ButtonProps, ButtonVariant} from './Button.types';
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

export const Button = ({children, className, isLoading = false, ...buttonProps}: ButtonProps) => {
  const {variant = 'contained', ...restBtnProps} = buttonProps;
  const classes = useStyles();
  const buttonCls = classNames(classes[variant], className);
  const variantType: any = ['contained', 'outlined', 'text']
    .reduce((selectedVariant: ButtonVariant, type: ButtonVariant): ButtonVariant => {
      if(variant.includes(type)) {
        return type;
      }

      return selectedVariant;
    }, 'contained') as ButtonVariant;

  return (
    <MaterialButton {...restBtnProps} variant={variantType} className={buttonCls} >
      {children}
      {isLoading && <ButtonSpinner />}
    </MaterialButton >
  );
};
