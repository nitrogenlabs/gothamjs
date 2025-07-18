/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {set} from '@nlabs/utils/objects/set';

import {GothamConstants} from '../constants/GothamConstants.js';

// Define the state type to avoid type errors
interface AppState {
  isLoading?: boolean;
  loadingContent?: string;
  notify?: {
    actions?: any[];
    anchorOrigin?: { horizontal: string; vertical: string };
    autoHideDuration?: number;
    isOpen?: boolean;
    key?: string | number;
    message?: string;
    severity?: string;
  };
  title?: string;
  config?: any;
}

export const gothamApp = {
  initialState: {
    isLoading: false,
    loadingContent: '',
    notify: {
      actions: [],
      autoHideDuration: 5000,
      isOpen: false,
      message: '',
      severity: 'info'
    },
    title: ''
  },
  name: 'app',
  action: (type: string, data: any, state: AppState = {}): AppState => {
    switch(type) {
      case GothamConstants.INITIALIZE:
        return {...state};
      case GothamConstants.LOADING:
        return {
          ...state,
          isLoading: data.isLoading,
          loadingContent: data.content || ''
        };
      case GothamConstants.NOTIFY_OPEN:
        return {
          ...state,
          notify: {
            ...(state.notify || {}),
            actions: data.actions || [],
            anchorOrigin: data.anchorOrigin || {horizontal: 'center', vertical: 'bottom'},
            autoHideDuration: data.autoHideDuration || (state.notify?.autoHideDuration || 5000),
            isOpen: true,
            key: data.key || new Date().getTime(),
            message: data.message || '',
            severity: data.severity || 'info'
          }
        };
      case GothamConstants.NOTIFY_CLOSE:
        return {
          ...state,
          notify: {
            ...(state.notify || {}),
            isOpen: false
          }
        };
      case GothamConstants.SET_CONFIG:
        return set(state, 'config', data.config);
      case GothamConstants.UPDATE_TITLE:
        return {...state, title: data.title};
      default:
        return state;
    }
  }
};
