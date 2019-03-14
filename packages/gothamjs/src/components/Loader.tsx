/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {StyleRulesCallback} from '@material-ui/core/styles';
import React from 'react';

import {initStyle} from '../utils/components';
import {Svg} from './Svg';

const styles: StyleRulesCallback = (theme) => ({
  loader: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    opacity: 0.9,
    textAlign: 'center'
  },
  loaderDefault: {
    position: 'relative'
  },
  loaderFull: {
    height: '100%',
    left: 0,
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: theme.zIndex.tooltip + 1
  },
  loaderThrobber: {
    display: 'flex'
  }
});

export const LoaderBase = ({classes, full}) => (
  <div id="loader" className={`${classes.loader} ${(full ? classes.loaderFull : classes.loaderDefault)}`}>
    <div className={classes.loaderThrobber}>
      <Svg name="loading" width={200} height={200} />
    </div >
  </div >
);

export const Loader = initStyle(LoaderBase, styles);
