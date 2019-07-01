/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {FluxFramework} from '@nlabs/arkhamjs';

import {TopBarProps} from '../components/TopBar/TopBar.types';
import {Theme} from '../config/theme.types';

export interface DefaultContainerProps {
  readonly exact: boolean;
  readonly Flux: FluxFramework;
  readonly history: History;
  readonly location: Location;
  readonly match?: any;
  readonly menu?: any[];
  readonly routes: any[];
  readonly staticContext?: any;
  readonly theme: Theme;
  readonly title: string;
  readonly topBar?: TopBarProps;
}

export interface DefaultContainerState {
  readonly isTopSolid?: boolean;
}
