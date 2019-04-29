/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {GothamMenuItem} from '../gotham';

export interface SideBarProps {
  readonly logo?: JSX.Element;
  readonly menu?: GothamMenuItem[];
  readonly open?: boolean;
}

export interface SideBarState {
  readonly isOpen: boolean;
}
