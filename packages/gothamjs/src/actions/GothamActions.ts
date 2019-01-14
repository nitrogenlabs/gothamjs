import {Flux, FluxAction} from '@nlabs/arkhamjs';
import isEmpty from 'lodash/isEmpty';

import {GothamConstants} from '../constants/GothamConstants';
import {GothamConfiguration, GothamStatus} from '../types/gotham';

/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
export class GothamActions {
  static init(): Promise<FluxAction> {
    return Flux.dispatch({type: GothamConstants.INITIALIZE});
  }

  static setConfig(config: GothamConfiguration): Promise<FluxAction> {
    return Flux.dispatch({config, type: GothamConstants.SET_CONFIG});
  }

  static navBack(): Promise<FluxAction> {
    return Flux.dispatch({type: GothamConstants.NAV_BACK});
  }

  static navForward(): Promise<FluxAction> {
    return Flux.dispatch({type: GothamConstants.NAV_FORWARD});
  }

  static navGoto(path: string): Promise<FluxAction> {
    return Flux.dispatch({path, type: GothamConstants.NAV_GOTO});
  }

  static navReplace(path: string): Promise<FluxAction> {
    return Flux.dispatch({path, type: GothamConstants.NAV_REPLACE});
  }

  static notify(message: string, status?: GothamStatus): void {
    Flux.dispatch({notification: {message, status}, type: GothamConstants.NOTIFY});
  }

  static updateTitle(title: string, separator: string = ' :: '): Promise<FluxAction> {
    const siteTitle: string = Flux.getState('gothamApp.title');

    if(!isEmpty(title) && siteTitle !== title) {
      document.title = `${title}${separator}${siteTitle}`;
    } else {
      document.title = `${siteTitle}`;
    }

    return Flux.dispatch({title, type: GothamConstants.UPDATE_TITLE});
  }
}
