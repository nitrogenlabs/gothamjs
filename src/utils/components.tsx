import {StyleRulesCallback, withStyles} from '@material-ui/core/styles';
import React from 'react';
import {hot} from 'react-hot-loader';

export const initComponent = (componentModule, component: React.ComponentType<any>, styles?: StyleRulesCallback) => {
  if(styles) {
    return hot(componentModule)(withStyles(styles, {withTheme: true})(component));
  }

  return hot(componentModule)(component);
};

export const initStyle = (component: React.ComponentType<any>, styles?: StyleRulesCallback) =>
  withStyles(styles, {withTheme: true})(component);
