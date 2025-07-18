/**
 * Copyright (c) 2024-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {LoggerDebugLevel} from '@nlabs/arkhamjs';
import {Logger} from '@nlabs/arkhamjs-middleware-logger';
import {BrowserStorage} from '@nlabs/arkhamjs-storage-browser';
import {useFlux} from '@nlabs/arkhamjs-utils-react';
import {merge} from '@nlabs/utils/objects/merge';
import {useEffect, useState} from 'react';
import {I18nextProvider} from 'react-i18next';
import {createBrowserRouter, RouterProvider} from 'react-router';

import {GothamRoot} from './GothamRoot.js';
import {GothamActions} from '../../actions/GothamActions.js';
import {Config} from '../../config/appConfig.js';
import {GothamConstants} from '../../constants/GothamConstants.js';
import {gothamApp} from '../../stores/GothamAppStore.js';
import {GothamContext} from '../../utils/GothamContext.js';
import {i18n} from '../../utils/i18nUtil.js';
import {parseRoutes} from '../../utils/routeUtils.js';

import type {FluxFramework, FluxMiddlewareType, FluxOptions} from '@nlabs/arkhamjs';
import type {GothamRouteData} from '../../types/gotham.js';
import type {FC, ReactNode} from 'react';
import type {RouteObject} from 'react-router';

export interface GothamProviderProps {
  readonly children?: ReactNode;
  readonly config: GothamConfiguration;
  readonly session?: Record<string, unknown>;
}

export type GothamPosition = 't' | 'tc' | 'tl' | 'tr' | 'b' | 'bc' | 'br' | 'bl';

export type GothamStatus = 'default' | 'error' | 'info' | 'success' | 'warning' | number;

export type ThemeDisplayMode = 'auto' | 'dark' | 'light';

export interface GothamConfiguration {
  readonly app?: {
    readonly logo?: string;
    readonly name?: string;
    readonly title?: string;
    readonly titleBarSeparator?: string;
  };
  readonly baseUrl?: string;
  readonly config?: FluxOptions;
  readonly displayMode?: ThemeDisplayMode;
  readonly flux?: FluxFramework;
  readonly isAuth?: () => boolean;
  readonly middleware?: FluxMiddlewareType[];
  readonly onInit?: () => void;
  readonly routes?: GothamRouteData[];
  readonly storageType?: 'local' | 'session';
  readonly stores?: unknown[];
  readonly theme?: Record<string, unknown>;
  readonly translations?: Record<string, unknown>;
}

export const defaultGothamConfig: GothamConfiguration = {
  app: {
    name: 'gotham',
    title: 'GothamJS'
  },
  baseUrl: '',
  isAuth: () => false,
  middleware: [],
  routes: [],
  storageType: 'session',
  stores: [],
  theme: {},
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
    routes = [],
    storageType,
    stores,
    translations
  } = config;
  const name = config?.app?.name;
  const [session, setSession] = useState({});
  const [router, setRouter] = useState<ReturnType<typeof createBrowserRouter> | undefined>();

  useEffect(() => {
    Config.set(config as Record<string, unknown>);

    const router = createBrowserRouter(
      [
        {
          children: parseRoutes(routes as unknown as RouteObject[]),
          element: <GothamRoot />
        }
      ]
    );

    setRouter(router);

    if(flux) {
      const env: string = Config.get('environment') as string;
      const logger: Logger = new Logger({
        debugLevel: env === 'development' ? LoggerDebugLevel.DISPATCH : LoggerDebugLevel.DISABLED
      });
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

  return (
    <I18nextProvider i18n={i18n(translations)}>
      <GothamContext.Provider value={{Flux: flux, isAuth, session}}>
        {router && <RouterProvider router={router}/>}
        {children}
      </GothamContext.Provider>
    </I18nextProvider>
  );
};