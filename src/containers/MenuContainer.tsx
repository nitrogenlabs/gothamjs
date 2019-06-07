/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {Theme} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {useFlux, useState} from '@nlabs/arkhamjs-utils-react';
import React, {useContext} from 'react';

import {SideBar} from '../components/SideBar/SideBar';
import {SideBarProps} from '../components/SideBar/SideBar.types';
import {TopBar} from '../components/TopBar/TopBar';
import {GothamConstants} from '../constants/GothamConstants';
import {ContainerContext} from '../utils/ContainerProvider';
import {GothamContext} from '../utils/GothamProvider';
import {renderTransition} from '../utils/routes';
import {getNavParams, getViewParams} from '../utils/viewUtils';
import {MenuContainerProps} from './MenuContainer.types';

const useStyles: any = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row'
  },
  content: {
    backgroundColor: theme.palette.background.default,
    flexGrow: 1,
    marginBottom: 50,
    minWidth: 0,
    overflowY: 'auto',
    paddingLeft: 15,
    paddingRight: 15
  },
  toolbar: theme.mixins.toolbar
}));

export const toggleMenu = (state, setState) => () => {
  const {isMenuOpen} = state;
  setState({isMenuOpen: !isMenuOpen});
};

export const renderMenu = (props: SideBarProps, isOpen: boolean, pathname: string): JSX.Element => {
  if(props) {
    return <SideBar {...props} open={isOpen} pathname={pathname} />;
  }

  return null;
};

export const MenuContainer = (props: MenuContainerProps) => {
  const {
    exact,
    Flux,
    history,
    location,
    match,
    routes = [],
    sideBar,
    staticContext,
    topBar = {}
  } = props;
  const classes = useStyles();

  // Initial state
  const [state, setState] = useState({
    isMenuOpen: false
  });
  const {isMenuOpen} = state;

  const context: any = useContext(GothamContext);
  const {isAuth} = context;
  const {pathname} = location;
  const navProps: any = getNavParams(props);
  const routeProps: any = {exact, history, location, match, staticContext};
  const viewProps: any = getViewParams(props);

  useFlux([
    {handler: toggleMenu(state, setState), type: GothamConstants.TOGGLE_MENU}
  ]);

  return (
    <ContainerContext.Provider value={{navProps, routeProps, viewProps}}>
      <TopBar {...topBar} transparent={false} />
      <div className={classes.container}>
        {renderMenu(sideBar, isMenuOpen, pathname)}
        <div className={classes.content}>
          <div className={classes.toolbar} />
          {renderTransition(routes, Flux, {...props, isAuth})}
        </div>
      </div>
    </ContainerContext.Provider>
  );
};

export default MenuContainer;
