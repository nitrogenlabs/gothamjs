/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {Theme} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import React from 'react';

import {Svg} from '../Svg/Svg';
import {LoaderProps} from './Loader.types';

const useStyles: any = makeStyles((theme: Theme) => ({
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
}));

export const Loader = ({full}: LoaderProps) => {
  const classes = useStyles();

  return (
    <div id="loader" className={`${classes.loader} ${(full ? classes.loaderFull : classes.loaderDefault)}`}>
      <div className={classes.loaderThrobber}>
        <Svg name="loading" width={200} height={200} />
      </div>
    </div>
  );
};
