/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {FluxFramework} from '@nlabs/arkhamjs';

import {SideBarProps} from '../components/SideBar/SideBar.types';
import {TopBarProps} from '../components/TopBar/TopBar.types';

export interface MenuContainerProps {
  readonly Flux: FluxFramework
  readonly location: Location;
  readonly menu?: any[];
  readonly routes: any[];
  readonly sideBar?: SideBarProps;
  readonly title: string;
  readonly topBar?: TopBarProps;
}

export interface MenuContainerState {
  readonly isMenuOpen: boolean;
}
