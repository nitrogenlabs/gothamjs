/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import * as React from 'react';

import {LogoPanel} from './LogoPanel';

export const Header = ({appLogo, appName}) => (
  <React.Fragment>
    <header>
      <div className="headerpanel">
        <LogoPanel name={appName} logo={appLogo} />
      </div>
    </header>
  </React.Fragment>
);
