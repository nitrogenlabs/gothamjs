import Grid from '@material-ui/core/Grid';
import {StyleRulesCallback} from '@material-ui/core/styles';
import React from 'react';

import {PromoItemProps, PromoRowProps} from '../types/promoRow';
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
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 80,
    paddingTop: 60
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: '700'
  }
});

export const promoItems = (list: PromoItemProps[], classes): JSX.Element => list.map((item: PromoItemProps) => {
  const {details, image, title} = item;

  return (
    <Grid key={title} item md={12 / list.length} className={classes.promoItem}>
      <div className={classes.promoImage}>{image}</div>
      <div className={classes.promoTitle}>{title}</div>
      <div className={classes.promoDetails}>{details}</div>
    </Grid>
  );
});

export const PromoRowBase = (props: PromoRowProps): JSX.Element => {
  const {list, classes} = props;

  return (
    <Grid className={classes.promoRow} container justify="center">
      {promoItems(list, classes)}
    </Grid>
  );
};

export const PromoRow = initStyle(PromoRowBase, styles);
