/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {LogoPanel} from './LogoPanel';

export interface HeaderProps {
  readonly appLogo?: string;
  readonly appName?: string;
}

export const Header = ({appLogo, appName}: HeaderProps) => (
  <header>
    <div className="headerpanel">
      <LogoPanel name={appName} logo={appLogo} />
    </div>
  </header>
);
