/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import * as React from 'react';

import {Svg} from '../Svg';

export const LogoPanel = ({logo, name}) => (
  <React.Fragment>
    <div className="logopanel">
      <a href="/" title={name}><Svg name={logo} /></a>
    </div>
  </React.Fragment>
);
