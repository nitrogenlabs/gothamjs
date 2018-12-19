/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {FluxAction} from '@nlabs/arkhamjs';

import {AppConstants} from '../constants/AppConstants';
import {AppActions} from './AppActions';

describe('AppActions', () => {
  const path: string = '/';
  const title: string = 'Test';

  describe('#navGoto', () => {
    it('should go to a route', async () => {
      // Method
      const action: FluxAction = await AppActions.navGoto(path);
      return expect(action.path).toBe(path);
    });
  });

  describe('#updateTitle', () => {
    let action;

    beforeAll(async () => {
      // Method
      action = await AppActions.updateTitle(title);
    });

    it('should dispatch AppConstants.UPDATE_TITLE', () => expect(action.type).toBe(AppConstants.UPDATE_TITLE));

    it('should contain content in action', () => {
      expect(action.title).toBe(title);
    });
  });
});
