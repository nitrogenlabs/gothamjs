/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {WithStyles} from '@material-ui/core/styles';
import {FluxFramework} from '@nlabs/arkhamjs';

export interface PageViewProps extends WithStyles<any> {
  readonly Flux?: FluxFramework;
  readonly computedMatch?: any;
  readonly location?: any;
  readonly path?: any;
  readonly name?: string;
  readonly sensitive?: any;
  readonly strict?: any;
  readonly title?: string;
}

export interface PageViewState {
}
