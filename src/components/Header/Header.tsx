import * as React from 'react';

import {HeaderProps} from '../../types/components/header';
import {LogoPanel} from './LogoPanel';

export class Header extends React.Component<HeaderProps> {
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
