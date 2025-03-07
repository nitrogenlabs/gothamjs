/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {Flux, FluxAction} from '@nlabs/arkhamjs';
import isEmpty from 'lodash/isEmpty';

import {GothamConstants} from '../constants/GothamConstants';
import {GothamConfiguration} from '../views/Gotham/GothamProvider';

export interface GothamNotifyParams {
  action?: string;
  autoHideDuration?: number;
  key?: string;
  message: string;
  variant?: 'error' | 'info' | 'success' | 'warning';
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
  notifyClose: (key: string): Promise<FluxAction> =>
    Flux.dispatch({key, type: GothamConstants.NOTIFY_CLOSE}),
  notifyOpen: (message: string, params: Partial<GothamNotifyParams> = {}): Promise<FluxAction> =>
    Flux.dispatch({message, ...params, type: GothamConstants.NOTIFY_OPEN}),
  setConfig: (config: GothamConfiguration): Promise<FluxAction> =>
    Flux.dispatch({config, type: GothamConstants.SET_CONFIG}),
  signOut: (): Promise<FluxAction> =>
    Flux.dispatch({type: GothamConstants.SIGN_OUT}),
  updateTitle: (title: string, separator: string = ' :: '): Promise<FluxAction> => {
    const siteTitle: string = localStorage.getItem('siteTitle') || '';

    if(!isEmpty(title) && siteTitle !== title) {
      document.title = `${title}${separator}${siteTitle}`;
    } else {
      document.title = siteTitle;
    }

    return Flux.dispatch({title, type: GothamConstants.UPDATE_TITLE});
  }
} as const;
