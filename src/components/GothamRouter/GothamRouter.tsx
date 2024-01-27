/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {useFluxListener} from '@nlabs/arkhamjs-utils-react';
import {useNavigate} from 'react-router-dom';

import {GothamConstants} from '../../constants/GothamConstants';

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

export const GothamRoute = (): JSX.Element => {
  const navigate = useNavigate();

  useFluxListener(GothamConstants.NAV_BACK, navBack(navigate));
  useFluxListener(GothamConstants.NAV_FORWARD, navForward(navigate));
  useFluxListener(GothamConstants.NAV_GOTO, navGoto(navigate));
  useFluxListener(GothamConstants.NAV_REPLACE, navReplace(navigate));

  return null;
};
