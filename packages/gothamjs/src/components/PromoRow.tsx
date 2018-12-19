/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {StyleRulesCallback} from '@material-ui/core/styles';
import React from 'react';

import {PromoItemProps, PromoRowProps} from '../types/components/promoRow';
import {initStyle} from '../utils/components';

const styles: StyleRulesCallback = (theme) => ({
  promoDetails: {
    fontSize: 14
  },
  promoImage: {},
  promoItem: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 50,
    paddingLeft: 50,
    paddingRight: 50,
    [theme.breakpoints.down('xs')]: {
      flexBasis: '100%',
      flexGrow: 1,
      paddingLeft: 30,
      paddingRight: 30
    }
  },
  promoRow: {
    paddingBottom: 80,
    paddingTop: 60
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: 700
  }
});

export const promoItems = (list: PromoItemProps[], classes): JSX.Element[] => list.map((item: PromoItemProps) => {
  const {details, image, title} = item;

  return (
    <div key={title} className={`${classes.promoItem} col`}>
      <div className={classes.promoImage}>{image}</div>
      <div className={classes.promoTitle}>{title}</div>
      <div className={classes.promoDetails}>{details}</div>
    </div>
  );
});

export const PromoRowBase = (props: PromoRowProps): JSX.Element => {
  const {list, classes} = props;

  return (
    <div className="container">
      <div className={`${classes.promoRow} row justify-content-center`}>
        {promoItems(list, classes)}
      </div>
    </div>
  );
};

export const PromoRow = initStyle(PromoRowBase, styles);
