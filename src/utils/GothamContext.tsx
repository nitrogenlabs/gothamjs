/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {Flux} from '@nlabs/arkhamjs';
import {createContext} from 'react';

export const GothamContext = createContext({Flux, isAuth: () => true, session: {}});
