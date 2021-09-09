import {Flux} from '@nlabs/arkhamjs';
import React, {createContext} from 'react';

import {GothamProviderProps} from '../views/Gotham';

const isAuth = () => true;

export const GothamContext = createContext({Flux, isAuth, session: {}});

export const GothamProvider = ({children, Flux, isAuth, session}: GothamProviderProps) => (
  <GothamContext.Provider value={{Flux, isAuth, session}}>{children}</GothamContext.Provider>
);
