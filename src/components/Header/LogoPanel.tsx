import * as React from 'react';

import {Svg} from '../Svg';

export const LogoPanel = ({logo, name}) => (
  <React.Fragment>
    <div className="logopanel">
      <a href="/" title={name}><Svg name={logo} /></a>
    </div>
  </React.Fragment>
);
