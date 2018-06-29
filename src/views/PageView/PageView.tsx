import {StyleRulesCallback, WithStyles, withStyles} from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import isEmpty from 'lodash/isEmpty';
import * as React from 'react';

const styles: StyleRulesCallback = (theme) => ({
  title: {
    borderRight: '1px solid #ccc',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10
  },
  toolbar: theme.mixins.toolbar
});

export interface Props {
  readonly name: string;
  readonly title?: string;
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

  renderTitle(title: string, classes) {
    if(title) {
      return (
        <div className={classes.title}>
          <Typography variant="display1">{title}</Typography>
        </div>
      );
    }

    return null;
  }

  render(): JSX.Element {
    const {children, classes, title} = this.props;

    return (
      <React.Fragment>
        <div className={classes.toolbar} />
        <Grid container direction="column">
          {this.renderTitle(title, classes)}
          {children}
        </Grid>
      </React.Fragment>
    );
  }
}

export const PageView = withStyles(styles, {withTheme: true})(PageViewBase);
