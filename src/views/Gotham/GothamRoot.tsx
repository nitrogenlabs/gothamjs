/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {useFluxListener} from '@nlabs/arkhamjs-utils-react';
import {useEffect} from 'react';
import {Outlet, useLocation, useNavigate} from 'react-router';

import {GothamConstants} from '../../constants/GothamConstants.js';
import {trackPageView} from '../../utils/analyticsUtils.js';
import {LoaderView} from '../LoaderView/LoaderView.js';

import type {FC} from 'react';

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
  const location = useLocation();

  useFluxListener(GothamConstants.NAV_BACK, navBack(navigate));
  useFluxListener(GothamConstants.NAV_FORWARD, navForward(navigate));
  useFluxListener(GothamConstants.NAV_GOTO, navGoto(navigate));
  useFluxListener(GothamConstants.NAV_REPLACE, navReplace(navigate));

  useEffect(() => {
    // Track page view on route change with route details
    trackPageView(location.pathname, document.title, {
      hash: location.hash,
      search: location.search,
      state: location.state
    });
  }, [location]);

  return (
    <>
      <Outlet/>
      <LoaderView />
    </>
  );
};