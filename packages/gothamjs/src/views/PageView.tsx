import {StyleRulesCallback, withStyles} from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import * as React from 'react';

import {PageViewProps, PageViewState} from '../types/views/page';

const styles: StyleRulesCallback = (theme) => ({
  title: {
    borderRight: '1px solid #ccc',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10
  },
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

  renderTitle(title: string, classes) {
    if(title) {
      return (
        <Grid item xs={12}>
          <div className={classes.title}>
            <Typography variant="h1">{title}</Typography>
          </div>
        </Grid>
      );
    }

    return null;
  }

  render(): JSX.Element {
    const {children, classes, title} = this.props;

    return (
      <div className={classes.view}>
        <div className={classes.toolbar} />
        <Grid container direction="column">
          {this.renderTitle(title, classes)}
          {children}
        </Grid>
      </div>
    );
  }
}

export const PageView = withStyles(styles, {withTheme: true})(PageViewBase);
