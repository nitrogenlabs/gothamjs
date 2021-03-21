/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import 'bootstrap/dist/css/bootstrap-grid.css';
import 'bootstrap/dist/css/bootstrap-reboot.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import {createMuiTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {ThemeProvider} from '@material-ui/styles';
import {ArkhamConstants, Flux, FluxFramework, FluxMiddlewareType, FluxOptions} from '@nlabs/arkhamjs';
import {Logger, LoggerDebugLevel} from '@nlabs/arkhamjs-middleware-logger';
import {BrowserStorage} from '@nlabs/arkhamjs-storage-browser';
import {useFluxListener} from '@nlabs/arkhamjs-utils-react';
import {Location} from 'history';
import merge from 'lodash/merge';
import React, {useEffect, useState} from 'react';
import {I18nextProvider} from 'react-i18next';
import {BrowserRouter} from 'react-router-dom';

import {GothamActions} from '../actions/GothamActions';
import {GlobalStyles, Loader, Notification} from '../components';
import {GothamRoute} from '../components/GothamRouter';
import {Config} from '../config/app';
import {defaultTheme} from '../config/theme';
import {GothamConstants} from '../constants/GothamConstants';
import {gothamApp} from '../stores/gothamAppStore';
import {GothamContext} from '../utils/GothamProvider';
import {i18n} from '../utils/i18nUtil';
import {renderTransition} from '../utils/routeUtils';

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
  readonly isAuth?: boolean;
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
  readonly name?: string;
  readonly onInit?: () => any;
  readonly routes?: GothamRoute[];
  readonly storageType?: 'local' | 'session';
  readonly stores?: any[];
  readonly title?: string;
  readonly titleBarSeparator?: string;
  readonly theme?: any;
  readonly translations?: any;
  readonly middleware?: FluxMiddlewareType[];
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
  children?: any;
  Flux: FluxFramework;
  isAuth?: () => boolean;
}

export interface ContainerProviderProps {
  children?: any;
  navProps: any;
  routeProps: any;
}

export const init = (setAppLoaded, config: GothamConfiguration) => (): void => {
  const {onInit} = config;
  GothamActions.init();

  if(onInit) {
    onInit();
  }

  setAppLoaded(true);
};

// Loader
export const toggleLoader = (setLoading, setLoaderContent) => ({content, isLoading}) => {
  setLoading(isLoading);
  setLoaderContent(content);
};

export const renderLoading = (isLoading: boolean, content: string): JSX.Element => {
  if(!isLoading) {
    return null;
  }

  return <Loader content={content} full />;
};

export const onKeyUp = (event) => {
  if(event.which === 9) {
    document.documentElement.classList.remove('noFocusOutline');
  }
};

export const Gotham = (props: GothamProps): JSX.Element => {
  // Initial state
  const [isAppLoaded, setAppLoaded] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [loaderContent, setLoaderContent] = useState();

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
      return createMuiTheme(merge(defaultTheme, themeType, configTheme));
    },
    [darkMode],
  );

  useFluxListener(ArkhamConstants.INIT, init(setAppLoaded, config));
  useFluxListener(GothamConstants.LOADING, toggleLoader(setLoading, setLoaderContent));

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <I18nextProvider i18n={i18n(translations)}>
        <GothamContext.Provider value={{Flux, isAuth}}>
          <GlobalStyles />
          {content}
          {renderLoading(isLoading, loaderContent)}
        </GothamContext.Provider>
      </I18nextProvider>
      <Notification />
    </ThemeProvider >
  );
};

export default Gotham;