/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {FluxFramework} from '@nlabs/arkhamjs';

export interface PageViewProps {
  readonly Flux?: FluxFramework;
  readonly children?: any;
  readonly classes?: any;
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
