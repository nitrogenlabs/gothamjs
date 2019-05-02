/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {Theme} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import React from 'react';

import {FeatureItemProps} from './FeatureItem.types';

const useStyles: any = makeStyles((theme: Theme) => ({
  featureContainer: {
    backgroundColor: '#e9e9e9',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 80,
    paddingTop: 60
  },
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
  featureTitle: {
    fontSize: 24,
    fontWeight: 100
  }
}));

export const featureContent = (feature: FeatureItemProps): JSX.Element => {
  const {details, title} = feature;
  const classes = useStyles();

  return (
    <div className={`col-md-7 col-xs-12 ${classes.featureContent}`} key="featureContent">
      <div className={classes.featureTitle}>{title}</div>
      <div className={classes.featureDetails}>{details}</div>
    </div>
  );
};

export const featureImage = (feature: FeatureItemProps): JSX.Element => {
  const {image} = feature;
  const classes = useStyles();
  return <div className={`col-md-5 col-xs-12 ${classes.featureImage}`} key="featureImage">{image}</div>;
};

export const FeatureItem = (props: FeatureItemProps): JSX.Element => {
  const {align = 'left'} = props;
  const classes = useStyles();
  const featureRow: JSX.Element[] = align === 'left'
    ? [featureContent(props), featureImage(props)]
    : [featureImage(props), featureContent(props)];

  return (
    <div className={classes.featureContainer}>
      <div className="container">
        <div className="row justify-content-center>">
          {featureRow}
        </div>
      </div>
    </div>
  );
};
