import * as React from 'react';

import {Component, ComponentProps} from '../Component/Component';
import {Icon} from '../Icon/Icon';

export interface PageHeaderProps extends ComponentProps {
  readonly children?: string;
  readonly icon?: string;
  readonly title?: string;
}

export class PageHeader extends Component<PageHeaderProps> {
  constructor(props: PageHeaderProps) {
    super(props, 'pageHeader');
  }

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

