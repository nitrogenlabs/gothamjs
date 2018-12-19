/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {WithStyles} from '@material-ui/core/styles';

import {GothamAppProps, GothamMenuItem} from '../gotham';

export interface SideBarProps extends WithStyles<any> {
  readonly baseProps?: GothamAppProps;
  readonly logo?: JSX.Element;
  readonly menu?: GothamMenuItem[];
  readonly open?: boolean;
}

export interface SideBarState {
  readonly isOpen: boolean;
}
