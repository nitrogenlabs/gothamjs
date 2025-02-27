/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {Flux, FluxAction} from '@nlabs/arkhamjs';
import isEmpty from 'lodash/isEmpty';

import {GothamNotifyParams} from '../components/Notify/Notify';
import {Config} from '../config/appConfig';
import {GothamConstants} from '../constants/GothamConstants';

import type {GothamConfiguration} from '../views/Gotham/GothamProvider';

export const GothamActions = {
  init: (): Promise<FluxAction> => Flux.dispatch({type: GothamConstants.INITIALIZE}),
  loading: (isLoading: boolean, content?: string): Promise<FluxAction> =>
    Flux.dispatch({content, isLoading, type: GothamConstants.LOADING}),
  navBack: (): Promise<FluxAction> => Flux.dispatch({type: GothamConstants.NAV_BACK}),
  navForward: (): Promise<FluxAction> => Flux.dispatch({type: GothamConstants.NAV_FORWARD}),
  navGoto: (path: string, params?: any): Promise<FluxAction> =>
    Flux.dispatch({params, path, type: GothamConstants.NAV_GOTO}),
  navReplace: (path: string, params?: any): Promise<FluxAction> =>
    Flux.dispatch({params, path, type: GothamConstants.NAV_REPLACE}),
  notifyOpen: (message: string, params: Partial<GothamNotifyParams> = {}): Promise<FluxAction> =>
    Flux.dispatch({message, ...params, type: GothamConstants.NOTIFY_OPEN}),
  notifyClose: (key: string): Promise<FluxAction> =>
    Flux.dispatch({key, type: GothamConstants.NOTIFY_CLOSE}),

  signOut: (): Promise<FluxAction> => Flux.dispatch({type: GothamConstants.SIGN_OUT}),
  setConfig: (config: GothamConfiguration): Promise<FluxAction> =>
    Flux.dispatch({config, type: GothamConstants.SET_CONFIG}),
  updateTitle: (title: string, separator: string = ' :: '): Promise<FluxAction> => {
    const siteTitle: string = Config.get('title', '');

    if(!isEmpty(title) && siteTitle !== title) {
      document.title = `${title}${separator}${siteTitle}`;
    } else {
      document.title = `${siteTitle}`;
    }

    return Flux.dispatch({title, type: GothamConstants.UPDATE_TITLE});
  }
};
