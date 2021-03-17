import {Flux} from '@nlabs/arkhamjs';
import React, {createContext} from 'react';

import {GothamProviderProps} from '../views/Gotham';

const isAuth = () => true;

export const GothamContext = createContext({Flux, isAuth});

export const GothamProvider = ({children, Flux, isAuth}: GothamProviderProps) => (
  <GothamContext.Provider value={{Flux, isAuth}}>{children}</GothamContext.Provider>
);
