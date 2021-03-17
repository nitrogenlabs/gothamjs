/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {makeStyles} from '@material-ui/styles';
import isEmpty from 'lodash/isEmpty';
import React from 'react';

import {Theme} from '../config/theme';
import {Svg} from './Svg';


const useStyles: any = makeStyles((theme: Theme) => ({
  loader: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    opacity: 0.95,
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
  loaderText: {
    fontSize: 12
  },
  loaderThrobber: {
    animationName: '$rotate',
    animationDuration: '750ms',
    animationIterationCount: 'infinite',
    animationTimingFunction: theme.transitions.easing.easeInOut,
    display: 'flex'
  },
  '@keyframes rotate': {
    '0%': {
      transform: 'rotate(0deg)'
    },
    '100%': {
      transform: 'rotate(360deg)'
    }
  }
}));

export interface LoaderProps {
  readonly content?: string;
  readonly full?: boolean;
}

export const Loader = ({content, full}: LoaderProps) => {
  const classes = useStyles();

  return (
    <div id="loader" className={`${classes.loader} ${(full ? classes.loaderFull : classes.loaderDefault)}`}>
      <div className={classes.loaderThrobber}>
        <Svg name="loading" width={50} height={50} />
      </div>
      {!isEmpty(content) && (
        <div className={classes.loaderText}>
          {content}
        </div>
      )}
    </div>
  );
};
