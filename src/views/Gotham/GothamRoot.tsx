/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {useFluxListener} from '@nlabs/arkhamjs-utils-react';
import {Suspense, type FC} from 'react';
import {Outlet, useNavigate} from 'react-router';

import {GothamConstants} from '../../constants/GothamConstants.js';
import {LoaderView} from '../LoaderView/LoaderView.js';

export const navBack = (history) => (): void => {
  history.goBack();
};

export const navForward = (history) => (): void => {
  history.goForward();
};

export const navGoto = (navigate) => (data): void => {
  const {params, path = ''} = data;
  navigate(path, params);
};

export const navReplace = (history) => (data): void => {
  const {params, path = ''} = data;
  history.replace(path, params);
};

export const GothamRoot: FC = () => {
  const navigate = useNavigate();

  console.log('GothamRoot::init');
  useFluxListener(GothamConstants.NAV_BACK, navBack(navigate));
  useFluxListener(GothamConstants.NAV_FORWARD, navForward(navigate));
  useFluxListener(GothamConstants.NAV_GOTO, navGoto(navigate));
  useFluxListener(GothamConstants.NAV_REPLACE, navReplace(navigate));

  return (
    <Suspense fallback={<LoaderView />}>
      <Outlet />
    </Suspense>
  );
};