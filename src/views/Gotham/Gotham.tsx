/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import 'bootstrap/dist/css/bootstrap-grid.css';
import 'bootstrap/dist/css/bootstrap-reboot.css';

import {createMuiTheme, CssBaseline} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/styles';
import {ArkhamConstants, Flux} from '@nlabs/arkhamjs';
import {Logger, LoggerDebugLevel} from '@nlabs/arkhamjs-middleware-logger';
import {BrowserStorage} from '@nlabs/arkhamjs-storage-browser';
import {useFlux} from '@nlabs/arkhamjs-utils-react';
import {createBrowserHistory, History} from 'history';
import merge from 'lodash/merge';
import React, {useEffect, useState} from 'react';
import {Router} from 'react-router-dom';

import {GothamActions} from '../../actions/GothamActions';
import {Loader} from '../../components/Loader/Loader';
import {Notification} from '../../components/Notification/Notification';
import {Config} from '../../config/app';
import {defaultTheme} from '../../config/theme';
import {GothamConstants} from '../../constants/GothamConstants';
import {GothamAppStore} from '../../stores/GothamAppStore';
import {GothamContext} from '../../utils/GothamProvider';
import {renderTransition} from '../../utils/routes';
import {GothamConfiguration, GothamProps} from './Gotham.types';

export const init = (state, setState, config: GothamConfiguration) => (): void => {
  const {onInit} = config;
  GothamActions.init();

  if(onInit) {
    onInit();
  }

  setState({...state, isAppLoaded: true});
};

export const navBack = (history: History) => (): void => {
  history.goBack();
};

export const navForward = (history: History) => (): void => {
  history.goForward();
};

export const navGoto = (history: History) => (data): void => {
  const {params, path = ''} = data;
  history.push(path, params);
};

export const navReplace = (history: History) => (data): void => {
  const {params, path = ''} = data;
  history.replace(path, params);
};

// Loader
export const toggleLoader = (state, setState) => ({isLoading}) => {
  setState({...state, isLoading});
};

export const renderLoading = (isLoading: boolean): JSX.Element => {
  if(!isLoading) {
    return null;
  }

  return <Loader />;
};

// Create browser history
export const history: History = createBrowserHistory();

export const Gotham = (props: GothamProps): JSX.Element => {
  // Initial state
  const [state, setState] = useState({
    currentNotification: {},
    hasNotification: false,
    isAppLoaded: false,
    isLoading: false
  });
  const {isAppLoaded} = state;

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
    middleware,
    name,
    storageType,
    stores,
    theme: configTheme = {}
    // title
  } = config;

  // Create theme
  const theme = createMuiTheme(merge(defaultTheme, configTheme));

  useFlux([
    {handler: init(state, setState, config), type: ArkhamConstants.INIT},
    {handler: toggleLoader(state, setState), type: GothamConstants.LOADING},
    {handler: navBack(history), type: GothamConstants.NAV_BACK},
    {handler: navForward(history), type: GothamConstants.NAV_FORWARD},
    {handler: navGoto(history), type: GothamConstants.NAV_GOTO},
    {handler: navReplace(history), type: GothamConstants.NAV_REPLACE}
  ]);

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
        stores: [GothamAppStore, ...stores]
      });
    }
  }, []);

  let content: JSX.Element;
  const {isAuth, routes = [], ...gothamConfig} = config;

  if(!isAppLoaded) {
    content = <Loader />;
  } else {
    content = (
      <Router history={history}>
        {renderTransition(routes, Flux, {...gothamConfig, isAuth})}
      </Router>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GothamContext.Provider value={{Flux, isAuth}}>
        {content}
      </GothamContext.Provider>
      <Notification state={state} setState={setState} />
    </ThemeProvider >
  );
};

export default Gotham;
