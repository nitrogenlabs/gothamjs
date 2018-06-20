import * as React from 'react';

import {Component, ComponentProps} from '../Component/Component';
import {LogoPanel} from './LogoPanel';

export interface HeaderProps extends ComponentProps {
  readonly appLogo: string;
  readonly appName: string;
}

export class Header extends Component<HeaderProps> {
  readonly name: string;

  constructor(props: HeaderProps) {
    super(props, 'header');
  }

  render(): JSX.Element {
    const {appLogo, appName} = this.props;

    return (
      <React.Fragment>
        <header>
          <div className="headerpanel">
            <LogoPanel name={appName} logo={appLogo} />
          </div>
        </header>
      </React.Fragment>
    );
  }
}
