/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import 'bootstrap/dist/css/bootstrap-grid.css';
import 'bootstrap/dist/css/bootstrap-reboot.css';

import {createMuiTheme, CssBaseline} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {ThemeProvider} from '@material-ui/styles';
import {ArkhamConstants, Flux} from '@nlabs/arkhamjs';
import {Logger, LoggerDebugLevel} from '@nlabs/arkhamjs-middleware-logger';
import {BrowserStorage} from '@nlabs/arkhamjs-storage-browser';
import {useFlux} from '@nlabs/arkhamjs-utils-react';
import merge from 'lodash/merge';
import React, {useEffect, useState} from 'react';
import {BrowserRouter} from 'react-router-dom';

import {GothamActions} from '../../actions/GothamActions';
import {GlobalStyles, Loader, Notification} from '../../components';
import {GothamRoute} from '../../components/Navigation/GothamRouter';
import {Config} from '../../config/app';
import {defaultTheme} from '../../config/theme';
import {GothamConstants} from '../../constants/GothamConstants';
import {gothamApp} from '../../stores/gothamAppStore';
import {GothamContext} from '../../utils/GothamProvider';
import {renderTransition} from '../../utils/routes';
import {GothamConfiguration, GothamProps} from './Gotham.types';

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
    theme: configTheme = {}
    // title
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

  useFlux(ArkhamConstants.INIT, init(setAppLoaded, config));
  useFlux(GothamConstants.LOADING, toggleLoader(setLoading, setLoaderContent));

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
      <GothamContext.Provider value={{Flux, isAuth}}>
        <GlobalStyles />
        {content}
        {renderLoading(isLoading, loaderContent)}
      </GothamContext.Provider>
      <Notification />
    </ThemeProvider >
  );
};

export default Gotham;
