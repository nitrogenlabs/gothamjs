/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {GothamMenuItem, GothamMenuType} from '../../views/Gotham/Gotham.types';

export interface SideBarProps {
  readonly logo?: JSX.Element;
  readonly menu?: GothamMenuItem[];
  readonly pathname?: string;
}

export interface SideBarMenuItemProps {
  readonly divider?: boolean;
  readonly icon: JSX.Element;
  readonly label: string;
  readonly path: string;
  readonly pathname?: string;
  readonly type?: GothamMenuType;
  readonly url: string;
}
