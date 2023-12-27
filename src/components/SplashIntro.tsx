/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {makeStyles} from '@mui/styles';
import React from 'react';

import {Theme} from '../config/theme';

const useStyles: any = makeStyles((theme: Theme) => ({
  splashIntro: {
    backgroundColor: theme.palette.background.default,
    backgroundPositionX: 'center',
    backgroundPositionY: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative'
  },
  splashIntroContent: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: 500
  }
}));

export interface SplashIntroProps {
  readonly backgroundImage?: string;
  readonly backgroundTextColor?: string;
  readonly children?: JSX.Element | JSX.Element[];
  readonly buttons?: string;
  readonly image?: JSX.Element;
  readonly text?: string;
}

export const SplashIntro = (props: SplashIntroProps): JSX.Element => {
  const {backgroundImage, children} = props;
  const classes = useStyles();

  return (
    <div className={classes.splashIntro} style={{backgroundImage: `url(${backgroundImage})`}}>
      <div className="row justify-content-center">
        <div className="col">
          <div className={classes.splashIntroContent}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
