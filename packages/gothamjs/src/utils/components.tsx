/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {StyleRulesCallback, withStyles} from '@material-ui/core/styles';
import React from 'react';
import {hot} from 'react-hot-loader';

export const initComponent = (
  componentModule: any,
  component: React.ComponentType<any>,
  styles?: StyleRulesCallback
) => {
  if(styles) {
    return hot(componentModule)(withStyles(styles, {withTheme: true})(component as any));
  }

  return hot(componentModule)(component);
};

export const initStyle = (component: React.ComponentType<any>, styles?: StyleRulesCallback) =>
  withStyles(styles, {withTheme: true})(component as any);
