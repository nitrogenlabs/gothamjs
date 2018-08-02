import '../styles/notFound.css';

import {StyleRulesCallback} from '@material-ui/core/styles';
import * as React from 'react';

import {NotFoundViewProps, NotFoundViewState} from '../types/views/notFound';
import {initComponent} from '../utils/components';
import {PageView} from './PageView';

const styles: StyleRulesCallback = () => ({
});

export class NotFoundViewBase extends React.PureComponent<NotFoundViewProps, NotFoundViewState> {
  render(): JSX.Element {
    const {name = 'home', title = 'Home'} = this.props;
    return (
      <PageView name={name} title={title}>
        <div className="glitch">
          <div className="r">Page Not Found</div>
          <div className="g">Page Not Found</div>
          <div className="b">Page Not Found</div>
        </div>
      </PageView>
    );
  }
}

export const NotFoundView = initComponent(module, NotFoundViewBase, styles);
export default NotFoundView;
