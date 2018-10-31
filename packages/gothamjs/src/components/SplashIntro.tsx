import Grid from '@material-ui/core/Grid';
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
      <Grid container justify="center">
        <Grid item xs={12} className={classes.splashIntroContent}>
          {children}
        </Grid>
      </Grid>
    </div>
  );
};

export const SplashIntro = initStyle(SplashIntroBase, styles);
