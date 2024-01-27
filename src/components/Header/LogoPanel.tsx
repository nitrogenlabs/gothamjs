/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {Fragment} from 'react';

import {Svg} from '../Svg/Svg';

export interface LogoPanelProps {
  readonly logo?: string;
  readonly name?: string;
}

export const LogoPanel = ({logo, name}: LogoPanelProps) => (
  <Fragment>
    <div className="logopanel">
      <a href="/" title={name}><Svg name={logo} /></a>
    </div>
  </Fragment>
);
