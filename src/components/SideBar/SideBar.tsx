/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import Drawer from '@material-ui/core/Drawer/Drawer';
import Hidden from '@material-ui/core/Hidden/Hidden';
import List from '@material-ui/core/List/List';
import {makeStyles} from '@material-ui/styles';
import {Flux} from '@nlabs/arkhamjs';
import {useFluxListener} from '@nlabs/arkhamjs-utils-react/lib';
import React, {useState} from 'react';

import {GothamConstants} from '../../constants/GothamConstants';
import {GothamMenuItem} from '../../views/Gotham';
import {SideBarMenuItem, SideBarMenuItemProps} from './SideBarMenuItem';

const useStyles: any = makeStyles((theme: any) => {
  const darkMode = theme.palette.type === 'dark';

  return {
    drawerPaper: {
      backgroundColor: 'transparent',
      position: 'relative'
    },
    drawerRoot: {
      backgroundColor: darkMode ? theme.palette.neutral.dark : theme.palette.neutral.light,
      height: '100vh'
    },
    menu: {
      paddingTop: theme.spacing(3)
    },
    sideBar: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 0,
      flexShrink: 0
    }
  };
});

export const closeDrawer = (): void => {
  Flux.dispatch({openState: false, type: GothamConstants.TOGGLE_MENU});
};

export const toggleMenu = (setOpenState) => ({openState}) => setOpenState(openState);

export const renderMenu = (pathname: string, menu: any[] = []) =>
  menu.map((item: SideBarMenuItemProps): JSX.Element => {
    const {label, path} = item;
    return <SideBarMenuItem key={`${label}${path}`} pathname={pathname} {...item} />;
  });

export interface SideBarProps {
  readonly menu?: GothamMenuItem[];
  readonly pathname?: string;
  readonly top?: JSX.Element;
}

export const SideBar = (props: SideBarProps) => {
  // Props
  const {menu, pathname, top} = props;

  // State
  const [openState, setOpenState] = useState(false);

  // Styling
  const classes = useStyles();

  useFluxListener(GothamConstants.TOGGLE_MENU, toggleMenu(setOpenState));

  return (
    <div className={classes.sideBar}>
      <Hidden lgUp>
        <Drawer
          classes={{paper: classes.drawerPaper, root: classes.drawerRoot}}
          open={openState}
          onClose={closeDrawer}>
          <div
            onClick={closeDrawer}
            onKeyDown={closeDrawer}
            role="button"
            tabIndex={0}>
            {top}
            <List className={classes.menu}>{renderMenu(pathname, menu)}</List>
          </div>
        </Drawer>
      </Hidden>
      <Hidden mdDown implementation="css">
        <Drawer
          classes={{paper: classes.drawerPaper, root: classes.drawerRoot}}
          open
          transitionDuration={{enter: 0.3, exit: 0.3}}
          variant="permanent">
          {top}
          <List className={classes.menu}>{renderMenu(pathname, menu)}</List>
        </Drawer>
      </Hidden>
    </div>
  );
};
