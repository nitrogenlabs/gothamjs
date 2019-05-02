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
import {GothamContext} from '../utils/GothamProvider';
import {renderTransition} from '../utils/routes';
import {DefaultContainerProps} from './DefaultContainer.types';

const useStyles: any = makeStyles((theme: Theme) => ({
  content: {
    backgroundColor: theme.palette.background.default,
    marginTop: -65,
    minWidth: 0,
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
  const {Flux, routes = [], topBar = {}} = props;
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

  return (
    <React.Fragment>
      <TopBar {...topBar} transparent />
      <div className={classes.content} onScroll={onScroll(props, state, setState)}>
        {renderTransition(routes, Flux, {...props, isAuth})}
      </div>
    </React.Fragment>
  );
};

export default DefaultContainer;
