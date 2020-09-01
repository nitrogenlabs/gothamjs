import {useFlux} from '@nlabs/arkhamjs-utils-react';
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

  useFlux(GothamConstants.NAV_BACK, navBack(history));
  useFlux(GothamConstants.NAV_FORWARD, navForward(history));
  useFlux(GothamConstants.NAV_GOTO, navGoto(history));
  useFlux(GothamConstants.NAV_REPLACE, navReplace(history));

  return null;
};
