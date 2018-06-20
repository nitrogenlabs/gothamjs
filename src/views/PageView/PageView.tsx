import {StyleRulesCallback, WithStyles, withStyles} from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import isEmpty from 'lodash/isEmpty';
import * as React from 'react';

const styles: StyleRulesCallback = (theme) => ({
  toolbar: theme.mixins.toolbar
});

export interface Props {
  readonly name: string;
}

export type PageViewProps = Props & WithStyles<typeof styles>;

export interface PageViewState {
}

export class PageViewBase extends React.Component<PageViewProps, PageViewState> {
  state: any;

  getClassNames(name: string): string {
    const classNames: string[] = ['view'];

    if(!isEmpty(name)) {
      classNames.push(`view-${name}`);
    }

    return classNames.join(' ');
  }

  render(): JSX.Element {
    const {children, classes} = this.props;

    return (
      <div>
        <div className={classes.toolbar} />
        <Grid container>
          {children}
        </Grid>
      </div>
    );
  }
}

export const PageView = withStyles(styles, {withTheme: true})(PageViewBase);
