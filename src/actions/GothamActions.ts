/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {Flux} from '@nlabs/arkhamjs';
import {isEmpty} from '@nlabs/utils/checks/isEmpty';

import {Config} from '../config/appConfig.js';
import {GothamConstants} from '../constants/GothamConstants.js';
import {GothamConfiguration} from '../views/Gotham/GothamProvider.js';

import type {FluxAction} from '@nlabs/arkhamjs';
import type {ReactElement} from 'react';

export interface GothamNotifyAction {
  readonly icon?: string;
  readonly label?: string;
  readonly onClick: (key: string) => void;
}

export type GothamSeverity = 'error' | 'info' | 'success' | 'warning';

export interface GothamNotifyParams {
  readonly actions?: GothamNotifyAction[];
  readonly anchorOrigin?: {
    horizontal: 'left' | 'center' | 'right';
    vertical: 'top' | 'bottom';
  };
  readonly autoHideDuration?: number;
  readonly key?: string;
  readonly message?: ReactElement | string;
  readonly severity?: GothamSeverity;
}

export interface NavParams {
  path: string;
  state?: Record<string, unknown>;
}

export const GothamActions = {
  init: (): Promise<FluxAction> => Flux.dispatch({type: GothamConstants.INITIALIZE}),
  loading: (isLoading: boolean, content?: string): Promise<FluxAction> =>
    Flux.dispatch({content, isLoading, type: GothamConstants.LOADING}),
  navBack: (): Promise<FluxAction> => Flux.dispatch({type: GothamConstants.NAV_BACK}),
  navForward: (): Promise<FluxAction> => Flux.dispatch({type: GothamConstants.NAV_FORWARD}),
  navGoto: (path: string, params?: Record<string, unknown>): Promise<FluxAction> =>
    Flux.dispatch({params, path, type: GothamConstants.NAV_GOTO}),
  navReplace: (path: string, params?: Record<string, unknown>): Promise<FluxAction> =>
    Flux.dispatch({params, path, type: GothamConstants.NAV_REPLACE}),
  notify: (params: GothamNotifyParams): Promise<FluxAction> =>
    Flux.dispatch({...params, type: GothamConstants.NOTIFY_OPEN}),
  notifyClose: (): Promise<FluxAction> =>
    Flux.dispatch({type: GothamConstants.NOTIFY_CLOSE}),
  setConfig: (config: GothamConfiguration): Promise<FluxAction> =>
    Flux.dispatch({config, type: GothamConstants.SET_CONFIG}),
  signOut: (): Promise<FluxAction> =>
    Flux.dispatch({type: GothamConstants.SIGN_OUT}),
  updateTitle: (title: string, separator?: string): Promise<FluxAction> => {
    const appTitle: string = Config.get('app.title', '') as string;
    const titleSeparator: string = separator || Config.get('app.titleBarSeparator', '::') as string;

    if(!isEmpty(title) && appTitle !== title) {
      document.title = [title, titleSeparator, appTitle].join(' ');
    } else {
      document.title = appTitle;
    }

    return Flux.dispatch({title, type: GothamConstants.UPDATE_TITLE});
  }
} as const;
