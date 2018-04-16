import {Flux, FluxAction} from 'arkhamjs';
import {createBrowserHistory, History} from 'history';

import {AppConstants} from '../../constants/AppConstants';

export class AppActions {
  static goto(route: string): History {
    const history = createBrowserHistory();
    history.push(`/${route}`);
    return history;
  }

  static updateContent(content: string): Promise<FluxAction> {
    return Flux.dispatch({type: AppConstants.UPDATE_CONTENT, content});
  }

  static updateView(path: string): Promise<FluxAction> {
    return Flux.dispatch({type: AppConstants.UPDATE_VIEW, path});
  }
}
