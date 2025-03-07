/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {Flux, type FluxFramework} from '@nlabs/arkhamjs';
import {createContext} from 'react';

export interface GothamContextProps {
  readonly children?: React.ReactNode;
  readonly Flux: FluxFramework;
  readonly isAuth?: () => boolean;
  readonly session?: Record<string, unknown>;
}

const initialContext: GothamContextProps = {Flux, isAuth: () => true, session: {}};

export const GothamContext = createContext(initialContext);
