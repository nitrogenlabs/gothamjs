/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import * as React from 'react';

export const NavTabs = () => (
  <React.Fragment>
    <ul className="nav nav-tabs nav-justified" role="tablist">
      <li className="active"><a data-target="#notification" data-toggle="tab">Notifications (2)</a></li>
      <li><a data-target="#reminders" data-toggle="tab">Reminders (4)</a></li>
    </ul>
  </React.Fragment>
);
