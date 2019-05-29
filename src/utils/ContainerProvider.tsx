import * as React from 'react';

import {ContainerProviderProps} from '../views/Gotham/Gotham.types';

export const ContainerContext = React.createContext({navProps: {}, routeProps: {}, viewProps: {}});

export const ContainerProvider = ({children, navProps, routeProps, viewProps}: ContainerProviderProps) => (
  <ContainerContext.Provider value={{navProps, routeProps, viewProps}}>{children}</ContainerContext.Provider>
);
