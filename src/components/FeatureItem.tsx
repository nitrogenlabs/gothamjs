import Grid from '@material-ui/core/Grid';
import {StyleRulesCallback} from '@material-ui/core/styles';
import React from 'react';

import {FeatureItemProps} from '../types/components/featureItem';
import {initStyle} from '../utils/components';

const styles: StyleRulesCallback = (theme) => ({
  featureContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 30,
    paddingLeft: 50,
    paddingRight: 50,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 30,
      paddingRight: 30
    }
  },
  featureDetails: {
    fontSize: 14
  },
  featureImage: {
    display: 'flex',
    height: 300,
    justifyContent: 'center',
    marginTop: 30,
    paddingLeft: 50,
    paddingRight: 50,
    [theme.breakpoints.down('xs')]: {
      marginBottom: 50,
      paddingLeft: 30,
      paddingRight: 30
    }
  },
  featureRow: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 80,
    paddingTop: 60
  },
  featureTitle: {
    fontSize: 24,
    fontWeight: 100
  }
});

export const featureLeft = (feature: FeatureItemProps): JSX.Element => {
  const {classes, details, image, title} = feature;

  return (
    <React.Fragment>
      <Grid item md={7} xs={12} className={classes.featureContent}>
        <div className={classes.featureTitle}>{title}</div>
        <div className={classes.featureDetails}>{details}</div>
      </Grid>
      <Grid item md={5} xs={12} className={classes.featureImage}>
        {image}
      </Grid>
    </React.Fragment>
  );
};

export const featureRight = (feature: FeatureItemProps): JSX.Element => {
  const {classes, details, image, title} = feature;

  return (
    <React.Fragment>
      <Grid item md={5} xs={12} className={classes.featureImage}>
        {image}
      </Grid>
      <Grid item md={7} xs={12} className={classes.featureContent}>
        <div className={classes.featureTitle}>{title}</div>
        <div className={classes.featureDetails}>{details}</div>
      </Grid>
    </React.Fragment>
  );
};

export const FeatureItemBase = (props: FeatureItemProps): JSX.Element => {
  const {align = 'left', classes} = props;
  let featureRow: JSX.Element;

  if(align === 'left') {
    featureRow = featureLeft(props);
  } else {
    featureRow = featureRight(props);
  }

  return <Grid className={classes.featureRow} container justify="center">{featureRow}</Grid>;
};

export const FeatureItem = initStyle(FeatureItemBase, styles);
