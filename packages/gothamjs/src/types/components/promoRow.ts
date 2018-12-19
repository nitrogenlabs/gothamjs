/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {WithStyles} from '@material-ui/core/styles';

export interface PromoItemProps {
  readonly details?: string;
  readonly image?: JSX.Element;
  readonly title?: string;
}

export interface PromoRowProps extends WithStyles<any> {
  readonly list?: PromoItemProps[];
}
