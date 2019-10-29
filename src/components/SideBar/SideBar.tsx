import Divider from '@material-ui/core/Divider/Divider';
import Drawer from '@material-ui/core/Drawer/Drawer';
import Hidden from '@material-ui/core/Hidden/Hidden';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import {makeStyles} from '@material-ui/styles';
import {Flux} from '@nlabs/arkhamjs';
import {useFlux} from '@nlabs/arkhamjs-utils-react/lib';
import React, {useState} from 'react';
import {matchPath, NavLink} from 'react-router-dom';

import {GothamConstants} from '../../constants/GothamConstants';
import {parseNavUrl} from '../../utils/viewUtils';
import {GothamMenuType} from '../../views/Gotham/Gotham.types';
import {SideBarProps} from './SideBar.types';

/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
const useStyles: any = makeStyles((theme: any) => ({
  drawer: {
    height: '100vh'
  },
  drawerPaper: {
    position: 'relative'
  },
  headers: {
    alignItems: 'center',
    flexDirection: 'row',
    fontSize: 16,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    textTransform: 'uppercase',
    '&:hover': {
      color: theme.palette.primary.main
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 14
    }
  },
  links: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.neutral.light,
    flexDirection: 'row',
    fontSize: 14,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    '&:hover': {
      color: theme.palette.primary.main
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 13
    }
  },
  menu: {
    paddingTop: theme.spacing(3)
  },
  menuIcon: {
    color: 'inherit',
    marginRight: 0,
    minWidth: 'auto'
  },
  menuItem: {
    fontSize: 'inherit'
  },
  menuLabel: {
    paddingLeft: 10
  },
  menuLink: {
    color: '#000',
    cursor: 'pointer',
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'none'
    }
  },
  sideBar: {
    display: 'flex',
    flexGrow: 0,
    flexShrink: 0
  }
}));

export const closeDrawer = (): void => {
  Flux.dispatch({openState: false, type: GothamConstants.TOGGLE_MENU});
};

export const getTypeClass = (type: GothamMenuType, classes: any): string =>
  (type === 'header' ? classes.headers : classes.links);

export const renderMenu = (pathname: string, menu: any[] = [], classes: any): JSX.Element => {
  const menuItems = menu.map((item) => {
    const {divider, icon, label, path, type = 'link', url} = item;
    let params = {};

    if(path) {
      const match = matchPath(pathname, {path});

      if(match) {
        const {params: matchParams} = match;
        params = matchParams;
      }
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
          className={getTypeClass(type, classes)}
          disableRipple
          disableTouchRipple
          divider={divider}
          focusRipple={false}>
          {icon && <ListItemIcon classes={{root: classes.menuIcon}}>{icon}</ListItemIcon>}
          <ListItemText
            classes={{primary: classes.menuItem, root: classes.menuLabel}}
            primary={label}
            primaryTypographyProps={{variant: 'h4'}} />
        </ListItem>
      </NavLink>
    );
  });

  return <List className={classes.menu}>{menuItems}</List>;
};

export const toggleMenu = (setOpenState) => ({openState}) => setOpenState(openState);

export const SideBar = (props: SideBarProps) => {
  // Props
  const {menu, pathname} = props;

  // State
  const [openState, setOpenState] = useState(false);

  // Styling
  const classes = useStyles();

  useFlux([
    {handler: toggleMenu(setOpenState), type: GothamConstants.TOGGLE_MENU}
  ]);
  return (
    <div className={classes.sideBar}>
      <Hidden mdUp>
        <Drawer className={classes.drawer} open={openState} onClose={closeDrawer}>
          <div
            tabIndex={0}
            role="button"
            onClick={closeDrawer}
            onKeyDown={closeDrawer}>
            {renderMenu(pathname, menu, classes)}
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
          {renderMenu(pathname, menu, classes)}
        </Drawer>
      </Hidden>
    </div>
  );
};
