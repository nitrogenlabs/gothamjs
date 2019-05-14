/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import MaterialButton from '@material-ui/core/Button';
import React from 'react';

import {ButtonProps} from './Button.types';

export const Button = (props: ButtonProps) => {
  const {children, ...buttonProps} = props;
  return <MaterialButton {...buttonProps}>{children}</MaterialButton>;
};
