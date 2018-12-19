import {StyleRulesCallback} from '@material-ui/core/styles';
import React from 'react';

import {FooterProps} from '../types/components/footer';
import {GothamMenuItem} from '../types/gotham';
import {initStyle} from '../utils/components';

/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
const styles: StyleRulesCallback = (theme) => ({
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

export const footerMenu = (menu: GothamMenuItem[], classes): JSX.Element[] => menu.map((item: GothamMenuItem) => {
  const {menu = [], label, url} = item;
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

export const FooterBase = (props: FooterProps): JSX.Element => {
  const {classes, copyright, logo, menu} = props;

  return (
    <div className={classes.footer}>
      <div className="container">
        <div className={`row justify-content-between ${classes.footerRow}`}>
          <div className="col">{logo}</div>
          {footerMenu(menu, classes)}
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

export const Footer = initStyle(FooterBase, styles);
