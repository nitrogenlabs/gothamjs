import * as React from 'react';

import {Component, ComponentProps} from '../Component/Component';
import {Icon} from '../Icon/Icon';

export interface LogoPanelProps extends ComponentProps {
  readonly logo: string;
  readonly name: string;
}

export class LogoPanel extends Component<LogoPanelProps> {
  readonly name: string;

  constructor(props: LogoPanelProps) {
    super(props, 'logoPanel');
  }

  render(): JSX.Element {
    const {name, logo} = this.props;

    return (
      <React.Fragment>
        <div className="logopanel">
          <a href="/" title={name}><Icon name={logo} /></a>
        </div>
      </React.Fragment>
    );
  }
}
