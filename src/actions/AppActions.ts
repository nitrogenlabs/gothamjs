import {Flux, FluxAction} from '@nlabs/arkhamjs';
import {Hunter} from 'rip-hunter';
import {GothamConfiguration} from 'types/views/gotham';

import {AppConstants} from '../constants/AppConstants';

export class AppActions {
  static setConfig(config: GothamConfiguration): Promise<FluxAction> {
    return Flux.dispatch({config, type: AppConstants.SET_CONFIG});
  }

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

  static updateTitle(title: string): Promise<FluxAction> {
    const siteTitle: string = Flux.getState('app.config.title');

    if(title !== '' && siteTitle !== title) {
      document.title = `${title} :: ${siteTitle}`;
    } else {
      document.title = `${siteTitle}`;
    }

    return Flux.dispatch({title, type: AppConstants.UPDATE_TITLE});
  }
}
