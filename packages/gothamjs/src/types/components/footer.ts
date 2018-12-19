/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {WithStyles} from '@material-ui/core/styles';

import {GothamMenuItem} from '../gotham';

export interface FooterProps extends WithStyles<any> {
  readonly copyright?: string;
  readonly logo?: JSX.Element;
  readonly menu?: GothamMenuItem[];
}
