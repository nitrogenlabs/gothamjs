/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {WithStyles} from '@material-ui/core/styles';

import {GothamAppProps} from '../gotham';

export interface PageViewProps extends WithStyles<any> {
  readonly baseProps?: GothamAppProps;
  readonly name?: string;
  readonly title?: string;
}

export interface PageViewState {
}
