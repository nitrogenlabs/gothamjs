/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {Theme} from '@material-ui/core';
import {FluxFramework} from '@nlabs/arkhamjs';

import {TopBarProps} from '../components/TopBar/TopBar.types';

export interface DefaultContainerProps {
  readonly Flux?: FluxFramework;
  readonly location?: Location;
  readonly routes?: any[];
  readonly theme: Theme;
  readonly title?: string;
  readonly topBar?: TopBarProps;
}

export interface DefaultContainerState {
  readonly isTopSolid?: boolean;
}
