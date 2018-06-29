import {StyleRulesCallback} from '@material-ui/core/styles';
import * as React from 'react';
import {Link} from 'react-router-dom';

import {HomeViewProps, HomeViewState} from '../../types/views/home';
import {initComponent} from '../../utils/components';
import {PageView} from '../PageView/PageView';

const styles: StyleRulesCallback = () => ({
});

export class HomeViewBase extends React.Component<HomeViewProps, HomeViewState> {
  render(): JSX.Element {
    return (
      <PageView name="home" title="Home">
        <div>Home!</div>
        <Link to="/login">Goto Login!</Link>
      </PageView>
    );
  }
}

export const HomeView = initComponent(module, HomeViewBase, styles);
export default HomeView;
