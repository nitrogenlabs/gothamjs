/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {WithStyles} from '@material-ui/core/styles';
import {FluxFramework} from '@nlabs/arkhamjs';

import {SideBarProps} from '../components/sideBar';
import {TopBarProps} from '../components/topBar';

export interface MenuContainerProps extends WithStyles<any> {
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
