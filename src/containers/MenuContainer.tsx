/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {Theme} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {useFlux, useState} from '@nlabs/arkhamjs-utils-react';
import * as React from 'react';

import {SideBar} from '../components/SideBar/SideBar';
import {SideBarProps} from '../components/SideBar/SideBar.types';
import {TopBar} from '../components/TopBar/TopBar';
import {GothamConstants} from '../constants/GothamConstants';
import {GothamContext} from '../utils/GothamProvider';
import {renderTransition} from '../utils/routes';
import {MenuContainerProps} from './MenuContainer.types';

const useStyles: any = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flex: 1
  },
  content: {
    backgroundColor: theme.palette.background.default,
    flexGrow: 1,
    marginBottom: 50,
    minWidth: 0,
    overflowY: 'auto',
    paddingLeft: 15,
    paddingRight: 15
  }
}));

export const toggleMenu = (state, setState) => () => {
  const {isMenuOpen} = state;
  setState({isMenuOpen: !isMenuOpen});
};

export const renderMenu = (props: SideBarProps, isOpen: boolean): JSX.Element => {
  if(props) {
    return <SideBar {...props} open={isOpen} />;
  }

  return null;
};

export const MenuContainer = (props: MenuContainerProps) => {
  const {Flux, sideBar, routes = [], topBar = {}} = props;
  const classes = useStyles();

  // Initial state
  const [state, setState] = useState({
    isMenuOpen: false
  });
  const {isMenuOpen} = state;

  const context: any = React.useContext(GothamContext);
  const {isAuth} = context;

  useFlux([
    {handler: toggleMenu(state, setState), type: GothamConstants.TOGGLE_MENU}
  ]);

  return (
    <React.Fragment>
      <TopBar {...topBar} transparent={false} />
      <div className={classes.container}>
        {renderMenu(sideBar, isMenuOpen)}
        <div className={classes.content}>
          {renderTransition(routes, Flux, {...props, isAuth})}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MenuContainer;
