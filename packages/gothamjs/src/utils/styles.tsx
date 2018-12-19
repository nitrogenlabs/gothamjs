/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import React from 'react';

import {StyledProps} from '../types/styles';

export const styled = (component: JSX.Element) => (style, options?: object) => {
  const StyledComponent = (props: StyledProps) => {
    const {classes, className, ...other} = props;
    return <component.type {...component.props} className={classNames(classes.root, className)} {...other} />;
  };

  const styles = typeof style === 'function' ? (theme) => ({root: style(theme)}) : {root: style};
  return withStyles(styles, options)(StyledComponent);
};

export const styledComponent = (Component) => (style, options = {}) => {
  const StyledComponent = (props) => {
    const {classes, className, ...other} = props;
    return <Component className={classNames(classes.root, className)} {...other} />;
  };

  const styles = typeof style === 'function' ? (theme) => ({root: style(theme)}) : {root: style};
  return withStyles(styles, options)(StyledComponent);
};
