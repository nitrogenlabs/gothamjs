import * as React from 'react';

import {GothamProviderProps} from '../types/gotham';

export const GothamContext = React.createContext(null);

export const GothamProvider = ({Flux, children}: GothamProviderProps) => (
  <GothamContext.Provider value={Flux}>{children}</GothamContext.Provider>
);
