/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {Store} from '@nlabs/arkhamjs';

import {LoginConstants} from '../../constants/LoginConstants';

export class AuthStore extends Store {
  constructor() {
    super('auth');
  }

  initialState(): object {
    return {
      session: {}
    };
  }

  onAction(type: string, data, state): object {
    switch(type) {
      case LoginConstants.SUCCESS: {
        const {session} = data;
        return {...state, session};
      }
      case LoginConstants.FAILED: {
        return {...state, session: {}};
      }
      default: {
        return state;
      }
    }
  }
}
