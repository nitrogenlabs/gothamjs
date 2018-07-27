import * as React from 'react';

import {Icon} from '../components/Icon';
import {PageHeaderProps} from '../types/containers/pageHeader';

export class PageHeader extends React.PureComponent<PageHeaderProps> {
  renderIcon(icon: string) {
    if(icon) {
      return (
        <Icon name={icon} />
      );
    }

    return null;
  }

  render(): JSX.Element {
    const {children, icon, title} = this.props;

    return (
      <React.Fragment>
        <div className="text-center">
          <h1>{title}</h1>
          <p className="subtitle">{children}</p>
          {this.renderIcon(icon)}
        </div>
      </React.Fragment>
    );
  }
}
