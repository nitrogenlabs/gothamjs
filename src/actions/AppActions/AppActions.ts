import {Flux, FluxAction} from '@nlabs/arkhamjs';
import {Hunter} from 'rip-hunter';

import {AppConstants} from '../../constants/AppConstants';

export class AppActions {
  static getExternal(url: string): Promise<FluxAction> {
    return Hunter.get(url).then((content) => Flux.dispatch({content, type: AppConstants.GET_EXTERNAL}));
  }

  static navBack(): Promise<FluxAction> {
    return Flux.dispatch({type: AppConstants.NAV_BACK});
  }

  static navForward(): Promise<FluxAction> {
    return Flux.dispatch({type: AppConstants.NAV_FORWARD});
  }

  static navGoto(path: string): Promise<FluxAction> {
    return Flux.dispatch({path, type: AppConstants.NAV_GOTO});
  }

  static navReplace(path: string): Promise<FluxAction> {
    return Flux.dispatch({path, type: AppConstants.NAV_REPLACE}); '1 1';
  }

  static updateContent(content: string): Promise<FluxAction> {
    return Flux.dispatch({content, type: AppConstants.UPDATE_CONTENT});
  }

  static updateView(path: string): Promise<FluxAction> {
    return Flux.dispatch({path, type: AppConstants.UPDATE_VIEW});
  }
}
