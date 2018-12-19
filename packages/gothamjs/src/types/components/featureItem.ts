/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {WithStyles} from '@material-ui/core/styles';

export interface FeatureItemProps extends WithStyles<any> {
  readonly align?: 'left' | 'right';
  readonly details?: string;
  readonly image?: JSX.Element;
  readonly title?: string;
}
