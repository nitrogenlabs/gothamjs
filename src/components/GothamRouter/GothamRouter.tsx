/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {FluxFramework} from '@nlabs/arkhamjs';
import {useFluxListener} from '@nlabs/arkhamjs-utils-react';
import {BrowserRouter, Routes, useNavigate} from 'react-router';

import {GothamConstants} from '../../constants/GothamConstants';
import {renderRouteList} from '../../utils/routeUtils';
import {GothamConfiguration} from '../../views/Gotham/GothamProvider';

import type {FC} from 'react';

export const navBack = (history) => (): void => {
  history.goBack();
};

export const navForward = (history) => (): void => {
  history.goForward();
};

export const navGoto = (history) => (data): void => {
  const {params, path = ''} = data;
  history.push(path, params);
};

export const navReplace = (history) => (data): void => {
  const {params, path = ''} = data;
  history.replace(path, params);
};

export const GothamRouteListeners: FC = (): null => {
  const navigate = useNavigate();

  useFluxListener(GothamConstants.NAV_BACK, navBack(navigate));
  useFluxListener(GothamConstants.NAV_FORWARD, navForward(navigate));
  useFluxListener(GothamConstants.NAV_GOTO, navGoto(navigate));
  useFluxListener(GothamConstants.NAV_REPLACE, navReplace(navigate));

  return null;
};

export type GothamRouteProps = {
  readonly authenticate?: boolean;
  readonly component?: React.ComponentType<Record<string, unknown>>;
  readonly container?: 'default' | 'menu';
  readonly exact?: boolean;
  readonly isAuth?: () => boolean;
  readonly location?: Location;
  readonly name?: string;
  readonly path: string;
  readonly props?: Record<string, unknown>;
  readonly routes?: GothamRouteProps[];
  readonly sensitive?: boolean;
  readonly strict?: boolean;
  readonly title?: string;
  readonly view?: 'confirm' | 'default'| 'home' | 'markdown' | 'signIn' | 'notfound';
};

export type GothamRoutesProps = {
  flux: FluxFramework;
  gothamConfig: GothamConfiguration;
  routes: GothamRouteProps[];
};

export const GothamRoutes: FC<GothamRoutesProps> = ({
  flux,
  gothamConfig,
  routes
}) => (
  <BrowserRouter>
    <GothamRouteListeners />
    <Routes>
      {renderRouteList(routes, flux, gothamConfig)}
    </Routes>
  </BrowserRouter>
);