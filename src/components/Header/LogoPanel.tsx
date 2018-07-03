import * as React from 'react';

import {LogoPanelProps} from '../../types/components/header';
import {Icon} from '../Icon/Icon';

export class LogoPanel extends React.Component<LogoPanelProps> {
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
