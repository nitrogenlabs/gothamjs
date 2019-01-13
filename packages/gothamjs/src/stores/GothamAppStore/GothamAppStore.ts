/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {Store} from '@nlabs/arkhamjs';
import {set} from 'lodash';

import {AppConstants} from '../../constants/AppConstants';
import {MarkdownConstants} from '../../constants/MarkdownConstants';

export class GothamAppStore extends Store {
  constructor() {
    super('gothamApp');
  }

  initialState(): object {
    return {
      config: {},
      currentTitle: '',
      external: {}
    };
  }

  onAction(type: string, data, state): object {
    switch(type) {
      case MarkdownConstants.CLEAR_EXTERNAL: {
        return set(state, 'external', {});
      }
      case MarkdownConstants.GET_EXTERNAL: {
        const {content, url} = data;
        return set(state, ['external', url], content);
      }
      case AppConstants.INITIALIZE: {
        return set(state, 'external', {});
      }
      case AppConstants.SET_CONFIG: {
        return set(state, 'config', data.config);
      }
      case AppConstants.UPDATE_TITLE: {
        return set(state, 'currentTitle', data.title);
      }
      default:
        return state;
    }
  }
}
