/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {GothamProvider} from '../views/Gotham/GothamProvider';

export const gothamDecorator = (Story) => (
  <GothamProvider config={{}}>
    <Story />
  </GothamProvider>
);
