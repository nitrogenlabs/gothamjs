/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {StyleRulesCallback} from '@material-ui/core/styles';
import React from 'react';

import {FeatureItemProps} from '../types/components/featureItem';
import {initStyle} from '../utils/components';

const styles: StyleRulesCallback = (theme) => ({
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
});

export const featureContent = (feature: FeatureItemProps): JSX.Element => {
  const {classes, details, title} = feature;

  return (
    <div className={`col-md-7 col-xs-12 ${classes.featureContent}`} key="featureContent">
      <div className={classes.featureTitle}>{title}</div>
      <div className={classes.featureDetails}>{details}</div>
    </div>
  );
};

export const featureImage = (feature: FeatureItemProps): JSX.Element => {
  const {classes, image} = feature;
  return <div className={`col-md-5 col-xs-12 ${classes.featureImage}`} key="featureImage">{image}</div>;
};

export const FeatureItemBase = (props: FeatureItemProps): JSX.Element => {
  const {align = 'left', classes} = props;
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

export const FeatureItem = initStyle(FeatureItemBase, styles);
