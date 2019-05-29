/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {Theme} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {useState} from '@nlabs/arkhamjs-utils-react';
import React, {useContext, useEffect} from 'react';

import {TopBar} from '../components/TopBar/TopBar';
import {GothamConstants} from '../constants/GothamConstants';
import {ContainerContext} from '../utils/ContainerProvider';
import {GothamContext} from '../utils/GothamProvider';
import {renderTransition} from '../utils/routes';
import {getNavParams, getViewParams} from '../utils/viewUtils';
import {DefaultContainerProps} from './DefaultContainer.types';

const useStyles: any = makeStyles((theme: Theme) => ({
  content: {
    backgroundColor: theme.palette.background.default,
    marginTop: -65,
    minWidth: 0,
    overflowX: 'hidden',
    overflowY: 'auto'
  }
}));

export const onScroll = (props, state, setState) => (): void => {
  const {Flux, theme} = props;
  const {isTopSolid} = state;
  const changeSolid: boolean = window.scrollY > theme.mixins.toolbar.minHeight;

  if(isTopSolid !== changeSolid) {
    setState({isTopSolid: changeSolid});
    Flux.dispatch({isTransparent: !changeSolid, type: GothamConstants.TOPBAR_SOLID});
  }
};

export const DefaultContainer = (props: DefaultContainerProps) => {
  const {
    exact,
    Flux,
    history,
    location,
    match,
    routes = [],
    staticContext,
    topBar = {}
  } = props;
  const [state, setState] = useState({
    isTopSolid: true
  });
  const classes = useStyles();

  useEffect(() => {
    window.addEventListener('scroll', onScroll(props, state, setState));

    return () => {
      window.removeEventListener('scroll', onScroll(props, state, setState));
    };
  }, []);


  const context: any = useContext(GothamContext);
  const {isAuth} = context;
  const navProps: any = getNavParams(props);
  const routeProps: any = {exact, history, location, match, staticContext};
  const viewProps: any = getViewParams(props);

  return (
    <ContainerContext.Provider value={{navProps, routeProps, viewProps}}>
      <TopBar {...topBar} transparent />
      <div className={classes.content} onScroll={onScroll(props, state, setState)}>
        {renderTransition(routes, Flux, {...props, isAuth})}
      </div>
    </ContainerContext.Provider>
  );
};

export default DefaultContainer;
