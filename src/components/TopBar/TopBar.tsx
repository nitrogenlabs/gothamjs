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
import {Backburger as BackburgerIcon, Menu as MenuIcon} from 'mdi-material-ui';
import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';

import {GothamActions} from '../../actions/GothamActions';
import {Theme} from '../../config/theme.types';
import {GothamConstants} from '../../constants/GothamConstants';
import {GothamMenuItem} from '../../views/Gotham/Gotham.types';
import {Button} from '../Button/Button';
import {TopBarProps} from './TopBar.types';

const TOPBAR_MAX_HEIGHT: number = 130;
const TOPBAR_MIN_HEIGHT: number = 64;
const TOPBAR_HEIGHT_TOLERANCE: number = 50;

const useStyles: any = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  appBarSolid: {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    boxShadow: '0 5px 10px 0 rgba(0, 0, 0, 0), 0px 3px 10px 0px rgba(0, 0, 0, .3)',
    transition: 'all 0.3s ease-in-out'
  },
  appBarTransparent: {
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

export const onToggleDrawer = () => {
  Flux.dispatch({type: GothamConstants.TOGGLE_MENU});
};

export const renderMenuItem = (props, isTransparent, menuItem: GothamMenuItem) => {
  const {
    solidTextColor = '#fff',
    transparentTextColor = '#fff'
  } = props;
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

export const renderMenu = (props, isTransparent, menu) =>
  menu.map((menuItem) => renderMenuItem(props, isTransparent, menuItem));

export const renderTitle = (title: string = ''): JSX.Element => {
  if(title !== '') {
    return <Typography variant="h1" color="inherit" noWrap>{title}</Typography>;
  }

  return null;
};

export const calculateStyles = (): any => {
  const {scrollY} = window;
  const tolerance: number = scrollY - TOPBAR_HEIGHT_TOLERANCE;

  // Calculate height
  let updatedHeight: number = TOPBAR_MAX_HEIGHT - tolerance;

  if(tolerance > TOPBAR_MAX_HEIGHT) {
    updatedHeight = TOPBAR_MAX_HEIGHT - (tolerance - TOPBAR_MAX_HEIGHT);

    if(updatedHeight < TOPBAR_MIN_HEIGHT) {
      updatedHeight = TOPBAR_MIN_HEIGHT;
    } else if(updatedHeight > TOPBAR_MAX_HEIGHT) {
      updatedHeight = TOPBAR_MAX_HEIGHT;
    }
  } else {
    updatedHeight = TOPBAR_MAX_HEIGHT;
  }

  // Calculate opacity
  const opacityHeight: number = (updatedHeight - TOPBAR_MIN_HEIGHT);
  const opacity: number = (opacityHeight > 0) ? 1 - (opacityHeight / TOPBAR_MIN_HEIGHT) : 1;

  return {backgroundColor: `rgba(0, 0, 0, ${opacity})`, height: updatedHeight};
};

export const onScroll = (setTopState, setStyle) => (): void => {
  const {scrollY} = window;
  setStyle(calculateStyles());
  setTopState((TOPBAR_MAX_HEIGHT + TOPBAR_MIN_HEIGHT + TOPBAR_HEIGHT_TOLERANCE) > scrollY);
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
  const [isTransparent, setTopState] = useState(transparent);
  const [barStyles, setStyle] = useState({backgroundColor: 'rgba(0, 0, 0, 0)', height: TOPBAR_MAX_HEIGHT});
  const {backgroundColor, height} = barStyles;

  // Styling
  const classes = useStyles();

  if(transparent) {
    useEffect(() => {
      console.log('DefaultView::add scroll listener');
      window.addEventListener('scroll', onScroll(setTopState, setStyle));

      return () => {
        window.removeEventListener('scroll', onScroll(setTopState, setStyle));
      };
    }, []);
  }

  const appBarSolid = `${classes.appBar} ${classes.appBarSolid}`;
  const appBarTransparent = `${classes.appBar} ${classes.appBarTransparent}`;
  const titleText = isTransparent ? classes.titleTextTransparent : classes.titleTextSolid;

  return (
    <AppBar
      className={isTransparent ? appBarTransparent : appBarSolid}
      position="fixed"
      style={{backgroundColor}}>
      <Toolbar
        classes={{root: titleText}}
        style={{height}}>
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
        {renderMenu(props, isTransparent, menu)}
      </Toolbar>
    </AppBar>
  );
};
