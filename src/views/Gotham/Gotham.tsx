/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {ArkhamConstants, Flux, FluxFramework, FluxMiddlewareType, FluxOptions} from '@nlabs/arkhamjs';
import {Logger, LoggerDebugLevel} from '@nlabs/arkhamjs-middleware-logger';
import {BrowserStorage} from '@nlabs/arkhamjs-storage-browser';
import {useFluxListener, useFluxValue} from '@nlabs/arkhamjs-utils-react';
import {Location} from 'history';
import merge from 'lodash/merge';
import {FC, useEffect, useState, type ReactNode} from 'react';
import {BrowserRouter} from 'react-router-dom';

import {GothamActions} from '../../actions/GothamActions';
import {GothamRoute} from '../../components/GothamRouter/GothamRouter';
import {Config} from '../../config/app';
import {GothamConstants} from '../../constants/GothamConstants';
import {gothamApp} from '../../stores/gothamAppStore';
import {renderTransition} from '../../utils/routeUtils';
import {LoaderView} from '../LoaderView';
import {GothamProvider} from './GothamProvider';
import {Loader} from '../../components/Loader/Loader';

export interface GothamProps {
  readonly classes?: any;
  readonly config?: GothamConfiguration;
  readonly isAuth?: () => boolean;
}

export interface GothamState {
  readonly currentNotification: GothamNotification;
  readonly hasNotification: boolean;
  readonly isAppLoaded: boolean;
  readonly isLoading: boolean;
}

export interface GothamRoute {
  readonly authenticate?: boolean;
  readonly asyncComponent?: any;
  readonly component?: any;
  readonly container?: 'default' | 'menu';
  readonly exact?: boolean;
  readonly isAuth?: () => boolean;
  readonly location?: Location;
  readonly name?: string;
  readonly path: string;
  readonly props?: any;
  readonly routes?: GothamRoute[];
  readonly sensitive?: boolean;
  readonly strict?: boolean;
  readonly title?: string;
  readonly view?: 'confirm' | 'home' | 'markdown' | 'signIn' | 'notfound';
}

export interface GothamButtonItem {
  readonly label?: string;
  readonly url?: string;
}

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
  readonly routes?: GothamRoute[];
  readonly storageType?: 'local' | 'session';
  readonly stores?: any[];
  readonly title?: string;
  readonly titleBarSeparator?: string;
  readonly theme?: any;
  readonly translations?: any;
}

export type GothamMenuType = 'header' | 'link';

export interface GothamMenuItem {
  readonly content?: (color: string) => ReactNode;
  readonly label?: string;
  readonly menu?: GothamMenuItem[];
  readonly path?: string;
  readonly type: GothamMenuType;
  readonly url: string;
}

export type GothamPosition = 't' | 'tc' | 'tl' | 'tr' | 'b' | 'bc' | 'br' | 'bl';
export type GothamStatus = 'default' | 'error' | 'info' | 'success' | 'warning' | number;

export interface GothamNotification {
  readonly key: string;
  readonly message: string;
  readonly status: GothamStatus;
}

export interface GothamProviderProps {
  readonly children?: any;
  readonly Flux: FluxFramework;
  readonly isAuth?: () => boolean;
  readonly session?: any;
}

export interface ContainerProviderProps {
  children?: any;
  navProps: any;
  routeProps: any;
}

export const init = (isAppLoaded, setAppLoaded, config: GothamConfiguration) => (): void => {
  const {onInit} = config;
  GothamActions.init();

  if(onInit) {
    onInit();
  }

  setAppLoaded(true);
};

export const onKeyUp = (event) => {
  if(event.which === 9) {
    document.documentElement.classList.remove('noFocusOutline');
  }
};

export const signOut = async () => {
  await Flux.clearAppData();
  await GothamActions.loading(false);
  GothamActions.navGoto('/signIn');
};

export const defaultGothamConfig: GothamConfiguration = {
  baseUrl: '',
  middleware: [],
  routes: [],
  storageType: 'session',
  stores: [],
  title: ''
};

export const Gotham: FC<GothamProps> = ({config: appConfig = {}}) => {
  const [isAppLoaded, setAppLoaded] = useState(false);

  // Save config to app
  const config: GothamConfiguration = merge(defaultGothamConfig, appConfig);
  Config.set(config);
  const {
    middleware,
    name,
    storageType,
    stores,
    theme: configTheme = {},
    translations = {translation: {}}
  } = config;

  useFluxListener(ArkhamConstants.INIT, init(isAppLoaded, setAppLoaded, config));
  useFluxListener(GothamConstants.SIGN_OUT, signOut);

  // Mount
  useEffect(() => {
    // Initialize
    if(Flux) {
      // ArkhamJS Middleware
      const env: string = Config.get('environment');
      const logger: Logger = new Logger({
        debugLevel: env === 'development' ? LoggerDebugLevel.DISPATCH : LoggerDebugLevel.DISABLED
      });

      // ArkhamJS Configuration
      const storage: BrowserStorage = new BrowserStorage({type: storageType});

      Flux.init({
        middleware: [logger, ...middleware],
        name,
        // state: {app: {title}},
        storage,
        stores: [gothamApp, ...stores]
      });
    }

    // Remove outline on focus
    document.body.addEventListener('keyup', onKeyUp);
  }, []);

  let content: ReactNode;
  const {isAuth, routes = [], ...gothamConfig} = config;

  // Session
  const existingSession = useFluxValue('user.session', {});
  const [session, setSession] = useState(existingSession);
  useFluxListener(GothamConstants.UPDATE_SESSION, ({session}) => {
    setSession(session);
    console.log('gotham::update', {session});
  });

  if(!isAppLoaded) {
    content = <Loader />;
  } else {
    content = (
      <BrowserRouter>
        <GothamRoute />
        {renderTransition(routes, Flux, {...gothamConfig, isAuth})}
      </BrowserRouter>
    );
  }

  return (
    <GothamProvider config={config} session={session}>
      {content}
      <LoaderView />
    </GothamProvider >
  );
};

export default Gotham;
