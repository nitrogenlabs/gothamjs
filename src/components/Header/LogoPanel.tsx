import * as React from 'react';

import {Icon} from '../Icon/Icon';

export const LogoPanel = ({logo, name}) => (
  <React.Fragment>
    <div className="logopanel">
      <a href="/" title={name}><Icon name={logo} /></a>
    </div>
  </React.Fragment>
);
