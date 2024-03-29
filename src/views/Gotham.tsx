import 'bootstrap/dist/css/bootstrap-grid.css';

import LuxonUtils from '@date-io/luxon';
import createCache from '@emotion/cache';
import {CacheProvider} from '@emotion/react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {createTheme, StyledEngineProvider, ThemeProvider} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import {ArkhamConstants, Flux, FluxFramework, FluxMiddlewareType, FluxOptions} from '@nlabs/arkhamjs';
import {Logger, LoggerDebugLevel} from '@nlabs/arkhamjs-middleware-logger';
import {BrowserStorage} from '@nlabs/arkhamjs-storage-browser';
import {useFluxListener, useFluxValue} from '@nlabs/arkhamjs-utils-react';
import {Location} from 'history';
import merge from 'lodash/merge';
import React, {useEffect, useState} from 'react';
import {I18nextProvider} from 'react-i18next';
import {BrowserRouter} from 'react-router-dom';

import {GothamActions} from '../actions/GothamActions';
import {GlobalStyles, Loader} from '../components';
import {GothamRoute} from '../components/GothamRouter';
import {Notify} from '../components/Notify';
import {Config} from '../config/app';
import {defaultTheme} from '../config/theme';
import {GothamConstants} from '../constants/GothamConstants';
import {gothamApp} from '../stores/gothamAppStore';
import {GothamContext} from '../utils/GothamProvider';
import {i18n} from '../utils/i18nUtil';
import {renderTransition} from '../utils/routeUtils';
import {LoaderView} from './LoaderView';

/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
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

export type GothamSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type GothamMenuType = 'header' | 'link';

export interface GothamMenuItem {
  readonly content?: (color: string) => JSX.Element;
  readonly label?: string;
  readonly url: string;
  readonly type: GothamMenuType;
  readonly menu?: GothamMenuItem[];
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

export const Gotham = (props: GothamProps): JSX.Element => {
  // Initial state
  const [isAppLoaded, setAppLoaded] = useState(false);

  // Configuration
  const {config: appConfig = {}} = props;
  const defaultConfig: GothamConfiguration = {
    baseUrl: '',
    middleware: [],
    routes: [],
    storageType: 'session',
    stores: [],
    title: ''
  };

  // Save config to app
  const config: GothamConfiguration = merge(defaultConfig, appConfig);
  Config.set(config);
  const {
    displayMode = 'auto',
    middleware,
    name,
    storageType,
    stores,
    theme: configTheme = {},
    translations = {translation: {}}
  } = config;

  // Create theme
  let darkMode: boolean;

  if(displayMode === 'auto') {
    darkMode = useMediaQuery('(prefers-color-scheme: dark)');
  } else {
    darkMode = displayMode === 'dark';
  }

  const theme = React.useMemo(
    () => {
      const themeType = {
        palette: {
          type: darkMode ? 'dark' : 'light'
        }
      };
      return createTheme(merge(defaultTheme, themeType, configTheme));
    },
    [darkMode],
  );

  useFluxListener(ArkhamConstants.INIT, init(isAppLoaded, setAppLoaded, config));
  useFluxListener(GothamConstants.SIGNOUT, signOut);

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

  let content: JSX.Element;
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

  const cache = createCache({
    key: 'css',
    prepend: true
  });

  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <CacheProvider value={cache}>
          <CssBaseline />
          <I18nextProvider i18n={i18n(translations)}>
            <LocalizationProvider dateAdapter={LuxonUtils}>
              <GothamContext.Provider value={{Flux, isAuth, session}}>
                <GlobalStyles />
                {content}
                <LoaderView />
                <Notify />
              </GothamContext.Provider>
            </LocalizationProvider>
          </I18nextProvider>
        </CacheProvider>
      </StyledEngineProvider>
    </ThemeProvider >
  );
};

export default Gotham;
