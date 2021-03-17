/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {makeStyles} from '@material-ui/styles';
import {FluxFramework} from '@nlabs/arkhamjs';
import * as React from 'react';

import {Theme} from '../config/theme';

export interface PageViewProps {
  readonly Flux?: FluxFramework;
  readonly children?: any;
  readonly classes?: any;
  readonly computedMatch?: any;
  readonly location?: any;
  readonly path?: any;
  readonly name?: string;
  readonly sensitive?: any;
  readonly strict?: any;
  readonly title?: string;
}

const useStyles: any = makeStyles((theme: Theme) => ({
  toolbar: theme.mixins.toolbar,
  view: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 30
  }
}));

export const PageView = ({children}: PageViewProps) => {
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
