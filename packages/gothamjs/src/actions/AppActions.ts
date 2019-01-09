/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {FluxAction, FluxFramework} from '@nlabs/arkhamjs';
import isEmpty from 'lodash/isEmpty';

import {AppConstants} from '../constants/AppConstants';
import {GothamConfiguration} from '../types/gotham';

export class AppActions {
  static init(Flux: FluxFramework): Promise<FluxAction> {
    return Flux.dispatch({type: AppConstants.INITIALIZE});
  }

  static setConfig(Flux: FluxFramework, config: GothamConfiguration): Promise<FluxAction> {
    return Flux.dispatch({config, type: AppConstants.SET_CONFIG});
  }

  static navBack(Flux: FluxFramework): Promise<FluxAction> {
    return Flux.dispatch({type: AppConstants.NAV_BACK});
  }

  static navForward(Flux: FluxFramework): Promise<FluxAction> {
    return Flux.dispatch({type: AppConstants.NAV_FORWARD});
  }

  static navGoto(Flux: FluxFramework, path: string): Promise<FluxAction> {
    return Flux.dispatch({path, type: AppConstants.NAV_GOTO});
  }

  static navReplace(Flux: FluxFramework, path: string): Promise<FluxAction> {
    return Flux.dispatch({path, type: AppConstants.NAV_REPLACE});
  }

  static updateTitle(Flux: FluxFramework, title: string, separator: string = ' :: '): Promise<FluxAction> {
    const siteTitle: string = Flux.getState('app.title');

    if(!isEmpty(title) && siteTitle !== title) {
      document.title = `${title}${separator}${siteTitle}`;
    } else {
      document.title = `${siteTitle}`;
    }

    return Flux.dispatch({title, type: AppConstants.UPDATE_TITLE});
  }
}
