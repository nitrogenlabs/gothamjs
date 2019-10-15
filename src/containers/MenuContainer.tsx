/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {makeStyles} from '@material-ui/styles';
import {useFlux} from '@nlabs/arkhamjs-utils-react';
import React, {useContext, useState} from 'react';

import {SideBar} from '../components/SideBar/SideBar';
import {SideBarProps} from '../components/SideBar/SideBar.types';
import {TopBar} from '../components/TopBar/TopBar';
import {GothamConstants} from '../constants/GothamConstants';
import {ContainerContext} from '../utils/ContainerProvider';
import {GothamContext} from '../utils/GothamProvider';
import {renderTransition} from '../utils/routes';
import {getNavParams, getViewParams} from '../utils/viewUtils';
import {MenuContainerProps} from './MenuContainer.types';

const useStyles: any = makeStyles((theme: any) => ({
  container: {
    bottom: 0,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    top: 64
  },
  content: {
    backgroundColor: theme.palette.background.default,
    flex: 1,
    minWidth: 0,
    overflowY: 'auto',
    position: 'relative'
  }
}));

export const renderMenu = (props: SideBarProps, pathname: string): JSX.Element => {
  if(props) {
    let loadedProps = props;

    if(props instanceof Function) {
      loadedProps = props();
    }

    return <SideBar {...loadedProps} pathname={pathname} />;
  }

  return null;
};

export const updateMenu = (setSidebarProps) => ({props}) => setSidebarProps(props);

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
  const [sideBarProps, setSidebarProps] = useState(sideBar);

  const context: any = useContext(GothamContext);
  const {isAuth} = context;
  const {pathname} = location;
  const navProps: any = getNavParams(props);
  const routeProps: any = {exact, history, location, match, staticContext};
  const viewProps: any = getViewParams(props);

  useFlux([
    {handler: updateMenu(setSidebarProps), type: GothamConstants.UPDATE_MENU}
  ]);

  return (
    <ContainerContext.Provider value={{navProps, routeProps, viewProps}}>
      <TopBar {...topBar} transparent={false} />
      <div className={classes.container}>
        {renderMenu(sideBarProps, pathname)}
        <div className={classes.content}>
          {renderTransition(routes, Flux, {...props, isAuth})}
        </div>
      </div>
    </ContainerContext.Provider>
  );
};

export default MenuContainer;
