/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import makeStyles from '@material-ui/styles/makeStyles';
import {FluxFramework} from '@nlabs/arkhamjs';
import isEmpty from 'lodash/isEmpty';
import React, {useContext} from 'react';

import {TopBar, TopBarProps} from '../components/TopBar';
import {Theme} from '../config/theme';
import {GothamContext} from '../utils/GothamProvider';
import {renderTransition} from '../utils/routes';

const useStyles: any = makeStyles((theme: Theme) => ({
  content: {
    backgroundColor: theme.palette.background.default,
    minWidth: 0,
    overflowX: 'hidden',
    overflowY: 'auto'
  }
}));

export interface DefaultContainerProps {
  readonly exact: boolean;
  readonly Flux: FluxFramework;
  readonly history: History;
  readonly location: Location;
  readonly match?: any;
  readonly menu?: any[];
  readonly routes: any[];
  readonly staticContext?: any;
  readonly theme: Theme;
  readonly title: string;
  readonly topBar?: TopBarProps;
}

export const DefaultContainer = (props: DefaultContainerProps) => {
  const {
    Flux,
    routes = [],
    topBar = {}
  } = props;
  const classes = useStyles();
  const context: any = useContext(GothamContext);
  const {isAuth} = context;

  const topBarComponent = !isEmpty(topBar)
    ? <TopBar {...topBar} transparent />
    : null;

  return (
    <>
      {topBarComponent}
      <div className={classes.content}>
        {renderTransition(routes, Flux, {...props, isAuth})}
      </div>
    </>
  );
};

export default DefaultContainer;
