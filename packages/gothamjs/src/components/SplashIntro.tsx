/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {StyleRulesCallback} from '@material-ui/core/styles';
import React from 'react';

import {SplashIntroProps} from '../types/components/splashIntro';
import {initStyle} from '../utils/components';

const styles: StyleRulesCallback = (theme) => ({
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
});

export const SplashIntroBase = (props: SplashIntroProps): JSX.Element => {
  const {backgroundImage, children, classes} = props;

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

export const SplashIntro = initStyle(SplashIntroBase, styles);
