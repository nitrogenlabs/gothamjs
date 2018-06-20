import {StyleRulesCallback, WithStyles, withStyles} from '@material-ui/core/styles';
import * as React from 'react';
import {Link} from 'react-router-dom';

import {PageView} from '../PageView/PageView';

const styles: StyleRulesCallback = () => ({
});

export type HomeViewProps = WithStyles<typeof styles>;

export interface HomeViewState {
}

export class HomeViewBase extends React.Component<HomeViewProps, HomeViewState> {
  render(): JSX.Element {
    return (
      <PageView name="home">
        <div>Home</div>
        <Link to="/login">Goto Login</Link>
      </PageView>
    );
  }
}

export const HomeView = withStyles(styles, {withTheme: true})(HomeViewBase);
