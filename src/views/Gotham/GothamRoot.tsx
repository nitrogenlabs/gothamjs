/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {useFluxListener} from '@nlabs/arkhamjs-utils-react';
import {useContext, useEffect, useRef} from 'react';
import {Outlet, useLocation, useNavigate} from 'react-router';

import {Notify} from '../../components/Notify/Notify.js';
import {GothamConstants} from '../../constants/GothamConstants.js';
import {GothamContext} from '../../utils/GothamContext.js';
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
  const {awsRum} = useContext(GothamContext);
  const navigate = useNavigate();
  const location = useLocation();
  const lastTrackedPath = useRef<string | undefined>(undefined);

  useFluxListener(GothamConstants.NAV_BACK, navBack(navigate));
  useFluxListener(GothamConstants.NAV_FORWARD, navForward(navigate));
  useFluxListener(GothamConstants.NAV_GOTO, navGoto(navigate));
  useFluxListener(GothamConstants.NAV_REPLACE, navReplace(navigate));

  useEffect(() => {
    const path = location.pathname;

    if(!awsRum || lastTrackedPath.current === path) {
      return;
    }

    lastTrackedPath.current = path;
    awsRum.track({
      name: 'page_view',
      path,
      properties: {
        title: document.title
      },
      type: 'page_view'
    });
  }, [awsRum, location.pathname]);

  return (
    <>
      <Outlet/>
      <Notify />
      <LoaderView />
    </>
  );
};
