/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {makeStyles} from '@material-ui/styles';
import isEmpty from 'lodash/isEmpty';
import React, {useContext} from 'react';

import {TopBar} from '../components/TopBar/TopBar';
import {Theme} from '../config/theme.types';
import {GothamContext} from '../utils/GothamProvider';
import {renderTransition} from '../utils/routes';
import {DefaultContainerProps} from './DefaultContainer.types';

const useStyles: any = makeStyles((theme: Theme) => ({
  content: {
    backgroundColor: theme.palette.background.default,
    minWidth: 0,
    overflowX: 'hidden',
    overflowY: 'auto'
  }
}));

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
