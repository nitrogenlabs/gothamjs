/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {FluxFramework} from '@nlabs/arkhamjs';
import {FC} from 'react';

import {ToolbarSpacer} from '../components/ToolbarSpacer';

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

export const PageView: FC<PageViewProps> = ({children}) => (
  <div className="flex flex-auto flex-column pb3">
    <ToolbarSpacer />
    <div className="container">
      {children}
    </div>
  </div>
);
