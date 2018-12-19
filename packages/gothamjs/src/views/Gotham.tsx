/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import 'bootstrap/dist/css/bootstrap-grid.css';
import 'bootstrap/dist/css/bootstrap-reboot.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import {createMuiTheme, MuiThemeProvider, StyleRulesCallback, withStyles} from '@material-ui/core/styles';
import {Logger, LoggerDebugLevel} from '@nlabs/arkhamjs-middleware-logger';
import {BrowserStorage} from '@nlabs/arkhamjs-storage-browser';
import {createBrowserHistory, History} from 'history';
import merge from 'lodash/merge';
import * as React from 'react';
import {hot} from 'react-hot-loader';
import Router from 'react-router-dom/Router';
import {createGlobalStyle} from 'styled-components';

import {AppActions} from '../actions/AppActions';
import {Config} from '../config/properties';
import {defaultTheme} from '../config/theme';
import {AppConstants} from '../constants/AppConstants';
import {AppStore} from '../stores/AppStore/AppStore';
import {AuthStore} from '../stores/AuthStore/AuthStore';
import {GothamConfiguration, GothamProps, GothamState} from '../types/gotham';
import {ArkhamJS} from '../utils/flux';
import {renderTransition} from '../utils/routes';

const GlobalStyle = createGlobalStyle`
body, p, h1, input {
  font-family: 'Open Sans', sans-serif;
}
h1, h2, h3, h4, h5, h6 {
  color: #606676;
  font-weight: 300;
  line-height: 1.2;
  margin-top: 0;
  margin-bottom: 0.5rem;
}
h1 {
  font-size: 2.5rem;
}
.text-center {
  text-align: center;
}
.subtitle {
  font-size: 22px;
  font-weight: 100;
  line-height: 32px;
  color: #5e6977;
  width: 55%;
  margin: 20px auto 40px;
}
.view {
  display: flex;
  flex: 1;
  height: 100vh;
}
body {
  margin: 0;
  padding: 0;
}
img {
  align-self: flex-start;
  max-height: 100%;
  max-width: 100%;
}
.routeWrapper {
  display: flex;
  flex: 1;
  min-height: 100vh;
  position: relative;
}
.routeWrapper > div {
  position: relative;
  width: 100%;
}
`;

const styles: StyleRulesCallback = () => ({});

export class GothamBase extends React.PureComponent<GothamProps, GothamState> {
  config: GothamConfiguration;
  history: History;
  state: any = {};
  theme;

  constructor(props: GothamProps) {
    super(props);

    // Methods
    this.init = this.init.bind(this);
    this.navBack = this.navBack.bind(this);
    this.navForward = this.navForward.bind(this);
    this.navGoto = this.navGoto.bind(this);
    this.navReplace = this.navReplace.bind(this);

    // Configuration
    const {config: appConfig = {}} = props;
    const defaultConfig: GothamConfiguration = {
      middleware: [],
      routes: [],
      stores: [],
      title: ''
    };
    this.config = merge(defaultConfig, appConfig);
    const {base: {Flux}, middleware, name, stores, title} = this.config;

    // Set Flux object
    ArkhamJS.setFlux(Flux);

    // ArkhamJS Middleware
    const env: string = Config.get('environment');
    const logger: Logger = new Logger({
      debugLevel: env === 'development' ? LoggerDebugLevel.DISPATCH : LoggerDebugLevel.DISABLED
    });

    // ArkhamJS Configuration
    const storage: BrowserStorage = new BrowserStorage({type: 'session'});

    if(ArkhamJS.flux) {
      ArkhamJS.flux.init({
        middleware: [logger, ...middleware],
        name,
        state: {app: {title}},
        storage,
        stores: [AppStore, AuthStore, ...stores]
      });
    }

    // Create browser history
    this.history = createBrowserHistory();

    // Create theme
    this.theme = createMuiTheme(defaultTheme);

    this.state = {
      isLoaded: false
    };
  }

  componentDidMount(): void {
    // Add event listeners
    ArkhamJS.flux.onInit(this.init);
    ArkhamJS.flux.on(AppConstants.NAV_BACK, this.navBack);
    ArkhamJS.flux.on(AppConstants.NAV_FORWARD, this.navForward);
    ArkhamJS.flux.on(AppConstants.NAV_GOTO, this.navGoto);
    ArkhamJS.flux.on(AppConstants.NAV_REPLACE, this.navReplace);

    // Initialize
    AppActions.init();
  }

  componentWillUnmount(): void {
    // Remove event listeners
    ArkhamJS.flux.offInit(this.init);
    ArkhamJS.flux.off(AppConstants.NAV_BACK, this.navBack);
    ArkhamJS.flux.off(AppConstants.NAV_FORWARD, this.navForward);
    ArkhamJS.flux.off(AppConstants.NAV_GOTO, this.navGoto);
    ArkhamJS.flux.off(AppConstants.NAV_REPLACE, this.navReplace);
  }

  init(): void {
    this.setState({isLoaded: true});
  }

  navBack(): void {
    this.history.goBack();
  }

  navForward(): void {
    this.history.goForward();
  }

  navGoto(data): void {
    const {path = ''} = data;
    this.history.push(path);
  }

  navReplace(data): void {
    const {path = ''} = data;
    this.history.replace(path);
  }

  render(): JSX.Element {
    const {isLoaded} = this.state;
    const {base, routes = []} = this.config;

    if(!isLoaded) {
      return null;
    }

    return (
      <MuiThemeProvider theme={this.theme}>
        <CssBaseline />
        <GlobalStyle />
        <Router history={this.history}>
          {renderTransition(routes, base)}
        </Router>
      </MuiThemeProvider >
    );
  }
}

export const Gotham = hot(module)(withStyles(styles, {withTheme: true})(GothamBase));
export default Gotham;
