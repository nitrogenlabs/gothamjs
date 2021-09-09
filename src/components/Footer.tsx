/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {makeStyles} from '@material-ui/styles';
import React from 'react';

import {GothamMenuItem} from '../views/Gotham';

export interface FooterProps {
  readonly copyright?: string;
  readonly logo?: JSX.Element;
  readonly menu?: GothamMenuItem[];
}

const useStyles: any = makeStyles({
  footer: {
    backgroundColor: '#808080',
    boxShadow: 'inset 0 10px 10px -5px rgba(0,0,0,.2)',
    display: 'flex',
    paddingLeft: 50,
    paddingRight: 50
  },
  footerCopyright: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.5,
    padding: 15
  },
  footerDetails: {
    fontSize: 14
  },
  footerList: {
    fontSize: 14,
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  footerRow: {
    color: '#fff',
    paddingBottom: 80,
    paddingTop: 60
  },
  footerText: {
    color: '#fff'
  },
  footerTitle: {
    fontSize: 14,
    fontWeight: 700
  }
});

export const footerMenu = (menu: GothamMenuItem[]): JSX.Element[] => menu.map((item: GothamMenuItem) => {
  const {menu = [], label, url} = item;
  const classes = useStyles();
  let renderedMenu: JSX.Element;

  if(menu) {
    const menuItems: JSX.Element[] = menu.map((menuItem) => {
      const {label: itemLabel, url: itemUrl} = menuItem;
      return <li key={itemLabel}><a href={itemUrl} className={classes.footerText}>{itemLabel}</a></li>;
    });
    renderedMenu = (<ul className={classes.footerList}>{menuItems}</ul>);
  }

  return (
    <div key={label} className={`col ${classes.footerItem}`}>
      <div className={classes.footerTitle}>{url ? <a href="url" className={classes.footerText}>label</a> : label}</div>
      {renderedMenu}
    </div>
  );
});

export const Footer = (props: FooterProps): JSX.Element => {
  const {copyright, logo, menu} = props;
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <div className="container">
        <div className={`row justify-content-between ${classes.footerRow}`}>
          <div className="col">{logo}</div>
          {footerMenu(menu)}
        </div>
        <div className="row">
          <div className={`${classes.footerCopyright} col`}>
            <div dangerouslySetInnerHTML={{__html: copyright}} />
          </div>
        </div>v
      </div>
    </div>
  );
};
