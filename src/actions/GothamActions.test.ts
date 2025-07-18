/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {Flux} from '@nlabs/arkhamjs';

import {GothamActions} from './GothamActions.js';
import {GothamConstants} from '../constants/GothamConstants.js';

import type {FluxAction} from '@nlabs/arkhamjs';

describe('GothamActions', () => {
  const path: string = '/';
  const title: string = 'Test';

  describe('#navGoto', () => {
    it('should go to a route', async () => {
      // Method
      const action: FluxAction = await GothamActions.navGoto(path);
      return expect(action.path).toBe(path);
    });
  });

  describe('#updateTitle', () => {
    let action;

    beforeAll(async () => {
      // Method
      action = await GothamActions.updateTitle(title);
    });

    it('should dispatch GothamConstants.UPDATE_TITLE', () => expect(action.type).toBe(GothamConstants.UPDATE_TITLE));

    it('should contain content in action', () => {
      expect(action.title).toBe(title);
    });
  });
});
