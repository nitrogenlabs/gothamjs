/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {Flux, type FluxFramework} from '@nlabs/arkhamjs';
import {createContext} from 'react';

import type {AwsRum} from './awsRum.js';

export interface GothamContextProps {
  readonly awsRum?: AwsRum;
  readonly children?: React.ReactNode;
  readonly Flux: FluxFramework;
  readonly isAuth?: () => boolean;
  readonly session?: Record<string, unknown>;
}

const initialContext: GothamContextProps = {Flux, awsRum: undefined, isAuth: () => true, session: {}};

export const GothamContext = createContext(initialContext);
