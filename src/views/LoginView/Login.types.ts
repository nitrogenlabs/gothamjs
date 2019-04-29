/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {PageViewProps} from '../PageView/PageView.types';

export interface LoginViewProps extends PageViewProps {
  readonly logo?: JSX.Element;
  readonly onLogin?: (username: string, password: string) => any;
  readonly onSignup?: () => any;
}

export interface LoginViewState {
  readonly authentication?: object;
  readonly errorMessage?: string;
  readonly session?: object;
}
