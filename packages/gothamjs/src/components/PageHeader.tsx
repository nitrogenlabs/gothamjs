/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import * as React from 'react';

import {Svg} from '../components/Svg';
import {PageHeaderProps} from '../types/components/pageHeader';

export class PageHeader extends React.PureComponent<PageHeaderProps> {
  renderIcon(icon: string) {
    if(icon) {
      return (
        <Svg name={icon} />
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
