/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import MaterialButton from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/styles';
import React from 'react';

import {ButtonProps} from './Button.types';

const useStyles = makeStyles(() => ({}));

export const Button = (props: ButtonProps) => {
  const {children, ...buttonProps} = props;
  const classes = useStyles();
  console.log('Button::classes', classes);
  return <MaterialButton {...buttonProps}>{children}</MaterialButton>;
};
