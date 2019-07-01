/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import AppBar from '@material-ui/core/AppBar/AppBar';
import Hidden from '@material-ui/core/Hidden/Hidden';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import {makeStyles} from '@material-ui/styles';
import {Flux} from '@nlabs/arkhamjs';
import {useFlux, useState} from '@nlabs/arkhamjs-utils-react';
import {Backburger as BackburgerIcon, Menu as MenuIcon} from 'mdi-material-ui';
import React from 'react';
import {NavLink} from 'react-router-dom';

import {GothamActions} from '../../actions/GothamActions';
import {Theme} from '../../config/theme.types';
import {GothamConstants} from '../../constants/GothamConstants';
import {GothamMenuItem} from '../../views/Gotham/Gotham.types';
import {Button} from '../Button/Button';
import {TopBarProps} from './TopBar.types';

const useStyles: any = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  appBarSolid: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    boxShadow: '0 5px 10px 0 rgba(0, 0, 0, 0), 0px 3px 10px 0px rgba(0, 0, 0, .3)',
    transition: 'all 0.3s ease-in-out'
  },
  appBarTransparent: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderBottom: '1px solid transparent',
    boxShadow: '0 0 0 0 rgba(0, 0, 0, 0), 0 0 0 0 rgba(0, 0, 0, 0), 0 0 0 0 rgba(0, 0, 0, 0)',
    transition: 'all 0.3s ease-in-out'
  },
  homeLink: {
    display: 'flex'
  },
  titleTextSolid: {
    color: theme.palette.primary.light,
    transition: 'all 0.3s ease-in-out'
  },
  titleTextTransparent: {
    color: theme.palette.primary.dark,
    transition: 'all 0.3s ease-in-out'
  }
}));

export const onUpdateBackground = (setState, data) => {
  const {isTransparent} = data;
  setState({isTransparent});
};

export const onToggleDrawer = () => {
  Flux.dispatch({type: GothamConstants.TOGGLE_MENU});
};

export const renderMenuItem = (props, state, menuItem: GothamMenuItem) => {
  const {
    solidTextColor = '#fff',
    transparentTextColor = '#fff'
  } = props;
  const {isTransparent} = state;
  const {content, label, url} = menuItem;
  const color = isTransparent ? transparentTextColor : solidTextColor;

  if(label) {
    return (
      <Button
        color="inherit"
        key={`${label}:${url}`}
        onClick={() => GothamActions.navGoto(url)}
        style={{color}}>
        {label}
      </Button >
    );
  }

  return content(color);
};

export const renderMenu = (props, state, menu) => menu.map((menuItem) => renderMenuItem(props, state, menuItem));

export const renderTitle = (title: string = ''): JSX.Element => {
  if(title !== '') {
    return <Typography variant="h1" color="inherit" noWrap>{title}</Typography>;
  }

  return null;
};

export const TopBar = (props: TopBarProps) => {
  const {
    logo,
    logoAlt,
    menu = [],
    open,
    title,
    transparent = false
  } = props;

  // State
  const [state, setState] = useState({
    isTransparent: transparent
  });
  const {isTransparent} = state;

  // Styling
  const classes = useStyles();

  useFlux([
    {handler: onUpdateBackground.bind(null, setState), type: GothamConstants.TOPBAR_SOLID}
  ]);

  const appBarSolid = `${classes.appBar} ${classes.appBarSolid}`;
  const appBarTransparent = `${classes.appBar} ${classes.appBarTransparent}`;
  const titleText = isTransparent ? classes.titleTextTransparent : classes.titleTextSolid;

  return (
    <AppBar
      className={isTransparent ? appBarTransparent : appBarSolid}
      position="fixed">
      <Toolbar classes={{root: titleText}}>
        <Hidden mdUp>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onToggleDrawer}>
            {open ? <BackburgerIcon /> : <MenuIcon />}
          </IconButton>
        </Hidden>
        <NavLink to="/">
          {isTransparent ? (logoAlt || logo) : logo}
          {renderTitle(title)}
        </NavLink>
        <div style={{flex: 1}} />
        {renderMenu(props, state, menu)}
      </Toolbar>
    </AppBar>
  );
};
