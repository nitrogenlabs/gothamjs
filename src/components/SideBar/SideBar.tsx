/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import Divider from '@material-ui/core/Divider/Divider';
import Drawer from '@material-ui/core/Drawer/Drawer';
import Hidden from '@material-ui/core/Hidden/Hidden';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import {makeStyles} from '@material-ui/styles';
import {Flux} from '@nlabs/arkhamjs';
import React, {useContext} from 'react';
import {matchPath, NavLink} from 'react-router-dom';

import {GothamConstants} from '../../constants/GothamConstants';
import {ContainerContext} from '../../utils/ContainerProvider';
import {parseNavUrl} from '../../utils/viewUtils';
import {SideBarProps} from './SideBar.types';

const useStyles: any = makeStyles((theme: any) => ({
  drawer: {
    height: '100vh'
  },
  drawerPaper: {
    position: 'relative'
  },
  links: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  },
  menuIcon: {
    height: 16,
    marginRight: 0,
    width: 16
  },
  menuLabel: {
    paddingLeft: 10
  },
  menuLink: {
    '&:hover': {
      color: theme.palette.primary.main,
      textDecoration: 'none'
    },
    color: '#000',
    cursor: 'pointer',
    textDecoration: 'none'
  },
  sideBar: {
    display: 'flex',
    flexGrow: 0,
    flexShrink: 0
  },
  toolbar: theme.mixins.toolbar
}));

export const toggleDrawer = (): void => {
  Flux.dispatch({type: GothamConstants.TOGGLE_MENU});
};

export const renderMenu = (pathname: string, menu: any[]): JSX.Element => {
  const classes = useStyles();
  const menuItems = menu.map((item) => {
    const {divider, icon, label, path, url} = item;
    const match = matchPath(pathname, {path});
    let params = {};

    if(match) {
      const {params: matchParams} = match;
      params = matchParams;
    }

    if(label === '|') {
      return <Divider />;
    }

    return (
      <NavLink
        activeStyle={{fontWeight: 700}}
        className={classes.menuLink}
        exact
        key={label} to={parseNavUrl(url, params)} >
        <ListItem
          button
          className={classes.links}
          disableRipple
          disableTouchRipple
          divider={divider}
          focusRipple={false}>
          {icon && <ListItemIcon classes={{root: classes.menuIcon}}>{icon}</ListItemIcon>}
          <ListItemText
            classes={{root: classes.menuLabel}}
            primary={label}
            primaryTypographyProps={{variant: 'h4'}} />
        </ListItem>
      </NavLink>
    );
  });

  return <List>{menuItems}</List>;
};

export const SideBar = (props: SideBarProps) => {
  // Props
  const {menu, open} = props;

  // Initial state
  // const [state, setState] = useStyles({
  //   isOpen: false
  // });

  // Styling
  const classes = useStyles();

  const context: any = useContext(ContainerContext);
  const {pathname} = context.routeProps.location;

  return (
    <div className={classes.sideBar}>
      <Hidden mdUp>
        <Drawer className={classes.drawer} open={open} onClose={() => toggleDrawer()}>
          <div className={classes.toolbar} />
          <div
            tabIndex={0}
            role="button"
            onClick={() => toggleDrawer()}
            onKeyDown={() => toggleDrawer()}>
            {renderMenu(pathname, menu)}
          </div>
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          classes={{paper: classes.drawerPaper}}
          open
          className={classes.drawer}
          transitionDuration={{enter: 0.3, exit: 0.3}}
          variant="permanent">
          <div className={classes.toolbar} />
          {renderMenu(pathname, menu)}
        </Drawer>
      </Hidden>
    </div>
  );
};
