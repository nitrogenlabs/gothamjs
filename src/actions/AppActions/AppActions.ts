import {Flux, FluxAction} from 'arkhamjs';

import {AppConstants} from '../../constants/AppConstants';

export class AppActions {
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
