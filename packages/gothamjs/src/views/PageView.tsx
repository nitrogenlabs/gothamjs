import {StyleRulesCallback, withStyles} from '@material-ui/core';
import * as React from 'react';

import {PageViewProps, PageViewState} from '../types/views/page';

/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
const styles: StyleRulesCallback = (theme) => ({
  toolbar: theme.mixins.toolbar,
  view: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 30
  }
});

export class PageViewBase extends React.PureComponent<PageViewProps, PageViewState> {
  state: any;

  render(): JSX.Element {
    const {children, classes} = this.props;

    return (
      <div className={classes.view}>
        <div className={classes.toolbar} />
        <div className="container">
          {children}
        </div>
      </div>
    );
  }
}

export const PageView = withStyles(styles, {withTheme: true})(PageViewBase as any);
