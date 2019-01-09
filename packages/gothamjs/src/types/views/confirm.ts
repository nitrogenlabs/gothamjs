/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {PageViewProps} from './page';

export interface ConfirmViewProps extends PageViewProps {
  onConfirm: (confirmation: object) => any;
  onResend: (confirmation: object) => any;
}

export interface ConfirmViewState {
  readonly authentication?: object;
  readonly errorMessage?: string;
  readonly session?: object;
}
