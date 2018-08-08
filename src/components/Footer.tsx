import Grid from '@material-ui/core/Grid';
import {StyleRulesCallback} from '@material-ui/core/styles';
import React from 'react';

import {FooterProps} from '../types/components/footer';
import {GothamMenuItem} from '../types/gotham';
import {initStyle} from '../utils/components';

const styles: StyleRulesCallback = (theme) => ({
  footer: {
    flexDirection: 'column',
    paddingLeft: 50,
    paddingRight: 50
  },
  footerCopyright: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    fontSize: 12,
    justifyContent: 'center',
    opacity: 0.5
  },
  footerDetails: {
    fontSize: 14
  },
  footerItem: {
    display: 'flex',
    flexBasis: '0px',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 0,
    [theme.breakpoints.down('xs')]: {
      flexBasis: '100%',
      marginBottom: 30
    }
  },
  footerList: {
    fontSize: 14,
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  footerRow: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 80,
    paddingTop: 60
  },
  footerTitle: {
    fontSize: 14,
    fontWeight: 700
  }
});

export const footerMenu = (menu: GothamMenuItem[], classes): JSX.Element[] => menu.map((item: GothamMenuItem) => {
  const {menu = [], label, url} = item;
  let renderedMenu: JSX.Element;

  if(menu) {
    const menuItems: JSX.Element[] = menu.map((menuItem) => {
      const {label: itemLabel, url: itemUrl} = menuItem;
      return <li key={itemLabel}><a href={itemUrl}>{itemLabel}</a></li>;
    });
    renderedMenu = (<ul className={classes.footerList}>{menuItems}</ul>);
  }

  return (
    <Grid key={label} item className={classes.footerItem}>
      <div className={classes.footerTitle}>{url ? <a href="url">label</a> : label}</div>
      {renderedMenu}
    </Grid>
  );
});

export const FooterBase = (props: FooterProps): JSX.Element => {
  const {classes, copyright, logo, menu} = props;

  return (
    <Grid className={classes.footer} container justify="center">
      <Grid item xs={12} className={classes.footerItem}>
        <Grid className={classes.footerRow} container justify="center">
          <Grid item className={classes.footerItem}>{logo}</Grid>
          {footerMenu(menu, classes)}
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.footerCopyright}>
        <div dangerouslySetInnerHTML={{__html: copyright}} />
      </Grid>
    </Grid>
  );
};

export const Footer = initStyle(FooterBase, styles);
