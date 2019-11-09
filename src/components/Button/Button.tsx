/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import MaterialButton from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/styles';
import classNames from 'classnames';
import React from 'react';

import {ButtonProps} from './Button.types';

const useStyles = makeStyles((theme: any) => ({
  button: {
    '&.MuiButton-contained': {
      backgroundColor: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark
      }
    },
    '&.MuiButton-outlined': {
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
      '&:hover': {
        borderColor: theme.palette.primary.dark,
        color: theme.palette.primary.dark
      }
    }
  }
}));

export const Button = (props: ButtonProps) => {
  const {children, className, ...buttonProps} = props;
  const classes = useStyles({});
  const buttonCls = classNames(classes.button, className);
  return <MaterialButton {...buttonProps} className={buttonCls}>{children}</MaterialButton>;
};
