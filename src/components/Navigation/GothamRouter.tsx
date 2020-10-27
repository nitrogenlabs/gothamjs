import {useFluxListener} from '@nlabs/arkhamjs-utils-react';
import {useHistory} from 'react-router-dom';

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
  const history = useHistory();

  useFluxListener(GothamConstants.NAV_BACK, navBack(history));
  useFluxListener(GothamConstants.NAV_FORWARD, navForward(history));
  useFluxListener(GothamConstants.NAV_GOTO, navGoto(history));
  useFluxListener(GothamConstants.NAV_REPLACE, navReplace(history));

  return null;
};
