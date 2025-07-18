/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {set} from '@nlabs/utils';

import {GothamConstants} from '../constants/GothamConstants';
import {MarkdownConstants} from '../constants/MarkdownConstants';

const initialState = {
  config: {},
  currentTitle: '',
  external: {}
};

export const gothamApp = (type: string, data: Record<string, unknown>, state: Record<string, unknown> = initialState): Record<string, unknown> => {
  switch(type) {
    case GothamConstants.INITIALIZE: {
      return set(state, 'external', {});
    }
    case GothamConstants.SET_CONFIG: {
      return set(state, 'config', data.config);
    }
    case GothamConstants.UPDATE_TITLE: {
      return set(state, 'currentTitle', data.title);
    }
    case MarkdownConstants.CLEAR_EXTERNAL: {
      return set(state, 'external', {});
    }
    case MarkdownConstants.GET_EXTERNAL: {
      const {content, url} = data;
      return set(state, ['external', url], content);
    }
    default:
      return state;
  }
};
