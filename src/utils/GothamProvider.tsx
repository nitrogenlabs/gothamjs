import {Flux} from '@nlabs/arkhamjs';
import * as React from 'react';

import {GothamProviderProps} from '../views/Gotham/Gotham.types';

export const GothamContext = React.createContext({Flux});

export const GothamProvider = ({Flux, children}: GothamProviderProps) => (
  <GothamContext.Provider value={{Flux}}>{children}</GothamContext.Provider>
);
