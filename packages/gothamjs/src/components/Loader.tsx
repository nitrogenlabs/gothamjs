/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {StyleRulesCallback} from '@material-ui/core/styles';
import React from 'react';

import {initStyle} from '../utils/components';

const styles: StyleRulesCallback = (theme) => ({
  loader: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
    left: 0,
    position: 'fixed',
    textAlign: 'center',
    top: 0,
    width: '100%',
    zIndex: theme.zIndex.tooltip + 1
  },
  loaderBackground: {
    left: '50%',
    position: 'absolute',
    top: '50%'
  }
});

export const LoaderBase = ({classes}) => (
  <div id="loader" className={classes.loader}>
    <div className={classes.loaderBackground}>
      <div className="l-s-2 blink">LOADING</div>
    </div >
  </div >
);

export const Loader = initStyle(LoaderBase, styles);
