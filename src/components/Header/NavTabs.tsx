import * as React from 'react';

import {NavTabsProps} from '../../types/components/header';

export class NavTabs extends React.Component<NavTabsProps> {
  readonly name: string;

  constructor(props: NavTabsProps) {
    super(props, 'navTabs');
  }

  render(): JSX.Element {
    return (
      <React.Fragment>
        <ul className="nav nav-tabs nav-justified" role="tablist">
          <li className="active"><a data-target="#notification" data-toggle="tab">Notifications (2)</a></li>
          <li><a data-target="#reminders" data-toggle="tab">Reminders (4)</a></li>
        </ul>
      </React.Fragment>
    );
  }
}
