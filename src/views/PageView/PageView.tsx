/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {makeStyles} from '@material-ui/styles';
import * as React from 'react';

import {Theme} from '../../config/theme.types';
import {PageViewProps} from './PageView.types';

const useStyles: any = makeStyles((theme: Theme) => ({
  toolbar: theme.mixins.toolbar,
  view: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 30
  }
}));

export const PageView = (props: PageViewProps) => {
  const {children} = props;
  const classes = useStyles();
  // const context: any = React.useContext(GothamContext);

  return (
    <div className={classes.view}>
      <div className={classes.toolbar} />
      <div className="container">
        {children}
      </div>
    </div>
  );
};
