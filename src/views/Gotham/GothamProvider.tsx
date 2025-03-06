/**
 * Copyright (c) 2024-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {Logger, LoggerDebugLevel} from '@nlabs/arkhamjs-middleware-logger';
import {BrowserStorage} from '@nlabs/arkhamjs-storage-browser';
import {useFlux} from '@nlabs/arkhamjs-utils-react';
import {useEffect, useState} from 'react';
import {I18nextProvider} from 'react-i18next';
import merge from 'lodash/merge';

import {Config} from '../../config/appConfig';
import {gothamApp} from '../../stores/gothamAppStore';
import {GothamContext} from '../../utils/GothamContext';
import {i18n} from '../../utils/i18nUtil';
import {GothamConstants} from '../../constants/GothamConstants';
import {GothamActions} from '../../actions/GothamActions';
import {GothamRoutes} from '../../components/GothamRouter/GothamRouter';

import type {FC, ReactNode} from 'react';
import type {FluxMiddlewareType, FluxFramework, FluxOptions} from '@nlabs/arkhamjs';
import type {GothamRouteProps} from '../../components/GothamRouter/GothamRouter';

export interface GothamProviderProps {
  readonly children?: ReactNode;
  readonly config: any;
  readonly session?: any;
}

export type GothamPosition = 't' | 'tc' | 'tl' | 'tr' | 'b' | 'bc' | 'br' | 'bl';

export type GothamStatus = 'default' | 'error' | 'info' | 'success' | 'warning' | number;

export type ThemeDisplayMode = 'auto' | 'dark' | 'light';

export interface GothamConfiguration {
  readonly baseUrl?: string;
  readonly config?: FluxOptions;
  readonly displayMode?: ThemeDisplayMode;
  readonly flux?: FluxFramework;
  readonly isAuth?: () => boolean;
  readonly middleware?: FluxMiddlewareType[];
  readonly name?: string;
  readonly onInit?: () => any;
  readonly routes?: GothamRouteProps[];
  readonly storageType?: 'local' | 'session';
  readonly stores?: any[];
  readonly title?: string;
  readonly titleBarSeparator?: string;
  readonly theme?: any;
  readonly translations?: any;
}

export const defaultGothamConfig: GothamConfiguration = {
  baseUrl: '',
  isAuth: () => false,
  middleware: [],
  name: 'gotham',
  routes: [],
  storageType: 'session',
  stores: [],
  theme: {},
  title: '',
  translations: {translation: {}}
};

export const init = (setAppLoaded, config: GothamConfiguration) => (): void => {
  const {onInit} = config;
  GothamActions.init();

  if(onInit) {
    onInit();
  }

  setAppLoaded(true);
};

export const signOut = (flux: FluxFramework) => async () => {
  await flux.clearAppData();
  await GothamActions.loading(false);
  GothamActions.navGoto('/signIn');
};

export const GothamProvider: FC<GothamProviderProps> = ({children, config: appConfig}) => {
  const flux = useFlux();
  const config: GothamConfiguration = merge(defaultGothamConfig, appConfig);
  const {
    isAuth,
    middleware,
    name,
    routes = [],
    storageType,
    stores,
    translations
  } = config;
  // const {isAuth, routes = [], ...gothamConfig} = config;
  Config.set(config);
  const [session, setSession] = useState({});

  useEffect(() => {
    if(flux) {
      // ArkhamJS Middleware
      const env: string = Config.get('environment');
      const logger: Logger = new Logger({
        debugLevel: env === 'development' ? LoggerDebugLevel.DISPATCH : LoggerDebugLevel.DISABLED
      });

      // ArkhamJS Configuration
      const storage: BrowserStorage = new BrowserStorage({type: storageType});

      flux.init({
        middleware: [logger, ...middleware],
        name,
        // state: {app: {title}},
        storage,
        stores: [gothamApp, ...stores]
      });

      flux.on(GothamConstants.SIGN_OUT, signOut(flux));
      flux.on(GothamConstants.UPDATE_SESSION, ({session}) => {
        setSession(session);
      });
    }
  }, []);

  // const existingSession = Flux.getState('user.session', {});

  console.log({routes});
  return (
    <I18nextProvider i18n={i18n(translations)}>
      <GothamContext.Provider value={{Flux: flux, isAuth, session}}>
        <GothamRoutes flux={flux} gothamConfig={config} routes={routes}/>
        {children}
      </GothamContext.Provider>
    </I18nextProvider>
  );
};