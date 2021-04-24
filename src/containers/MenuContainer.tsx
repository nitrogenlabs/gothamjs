/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {makeStyles} from '@material-ui/styles';
import {useFluxListener} from '@nlabs/arkhamjs-utils-react';
import isEmpty from 'lodash/isEmpty';
import React, {useContext, useState} from 'react';

import {SideBar, SideBarProps} from '../components/SideBar/SideBar';
import {TopBar} from '../components/TopBar';
import {GothamConstants} from '../constants/GothamConstants';
import {GothamContext} from '../utils/GothamProvider';
import {renderTransition} from '../utils/routeUtils';
import {useRoute} from '../utils/viewUtils';
import {DefaultContainerProps} from './DefaultContainer';

const useStyles: any = makeStyles((theme: any) => ({
  container: {
    bottom: 0,
    display: 'flex',
    flex: 1,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    top: 64
  },
  content: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
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

export interface MenuContainerProps extends DefaultContainerProps {
  readonly sideBar?: SideBarProps;
}

export const MenuContainer = (props: MenuContainerProps) => {
  const {
    Flux,
    routes = [],
    sideBar,
    topBar = {}
  } = props;
  const classes = useStyles();

  // Initial state
  const [sideBarProps, setSidebarProps] = useState(sideBar);
  const context: any = useContext(GothamContext);
  const {isAuth} = context;
  const {location: {pathname}} = useRoute();
  const topBarComponent = !isEmpty(topBar)
    ? <TopBar {...topBar} transparent={false} />
    : null;
  useFluxListener(GothamConstants.UPDATE_MENU, updateMenu(setSidebarProps));

  return (
    <>
      {topBarComponent}
      <div className={classes.container}>
        {renderMenu(sideBarProps, pathname)}
        <div className={classes.content}>
          {renderTransition(routes, Flux, {...props, isAuth})}
        </div>
      </div>
    </>
  );
};

export default MenuContainer;
