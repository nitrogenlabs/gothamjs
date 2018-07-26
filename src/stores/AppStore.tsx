import {Store} from '@nlabs/arkhamjs';
import {set} from 'lodash';

import {AppConstants} from '../constants/AppConstants';

export class AppStore extends Store {
  constructor() {
    super('app');
  }

  initialState(): object {
    return {
      config: {},
      currentTitle: ''
    };
  }

  onAction(type: string, data, state): object {
    switch(type) {
      case AppConstants.SET_CONFIG:
        return set(state, 'config', data.config);
      case AppConstants.UPDATE_TITLE:
        return set(state, 'currentTitle', data.title);
      default:
        return state;
    }
  }
}
