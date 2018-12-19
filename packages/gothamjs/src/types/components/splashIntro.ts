/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {WithStyles} from '@material-ui/core/styles';

export interface SplashIntroProps extends WithStyles<any> {
  readonly backgroundImage?: string;
  readonly backgroundTextColor?: string;
  readonly children?: JSX.Element | JSX.Element[];
  readonly buttons?: string;
  readonly image?: JSX.Element;
  readonly text?: string;
}
