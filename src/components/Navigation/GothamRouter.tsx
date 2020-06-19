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

  useFlux([
    {handler: navBack(history), type: GothamConstants.NAV_BACK},
    {handler: navForward(history), type: GothamConstants.NAV_FORWARD},
    {handler: navGoto(history), type: GothamConstants.NAV_GOTO},
    {handler: navReplace(history), type: GothamConstants.NAV_REPLACE}
  ]);

  return null;
};
