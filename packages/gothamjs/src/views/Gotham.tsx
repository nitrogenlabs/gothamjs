import 'bootstrap/dist/css/bootstrap-grid.css';
import 'bootstrap/dist/css/bootstrap-reboot.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import {createMuiTheme, MuiThemeProvider, StyleRulesCallback, withStyles} from '@material-ui/core/styles';
import {Flux} from '@nlabs/arkhamjs';
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
import {AuthStore} from '../stores/AuthStore/AuthStore';
import {GothamAppStore} from '../stores/GothamAppStore/GothamAppStore';
import {GothamConfiguration, GothamProps, GothamState} from '../types/gotham';
import {GothamContext} from '../utils/GothamProvider';
import {renderTransition} from '../utils/routes';

/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
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
      storageType: 'session',
      stores: [],
      title: ''
    };
    this.config = merge(defaultConfig, appConfig);
    const {
      middleware,
      name,
      storageType,
      stores,
      theme,
      title
    } = this.config;

    // Throw an error if Flux is not added to the config
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
        state: {app: {title}},
        storage,
        stores: [GothamAppStore, AuthStore, ...stores]
      });
    }

    // Create browser history
    this.history = createBrowserHistory();

    // Create theme
    this.theme = theme && createMuiTheme(theme || defaultTheme);

    this.state = {
      isLoaded: false
    };
  }

  componentDidMount(): void {
    // Add event listeners
    Flux.onInit(this.init);
    Flux.on(AppConstants.NAV_BACK, this.navBack);
    Flux.on(AppConstants.NAV_FORWARD, this.navForward);
    Flux.on(AppConstants.NAV_GOTO, this.navGoto);
    Flux.on(AppConstants.NAV_REPLACE, this.navReplace);

    // Initialize
    AppActions.init();
  }

  componentWillUnmount(): void {
    // Remove event listeners
    Flux.offInit(this.init);
    Flux.off(AppConstants.NAV_BACK, this.navBack);
    Flux.off(AppConstants.NAV_FORWARD, this.navForward);
    Flux.off(AppConstants.NAV_GOTO, this.navGoto);
    Flux.off(AppConstants.NAV_REPLACE, this.navReplace);
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
        <GothamContext.Consumer>{({Flux}) => (
          <Router history={this.history}>
            {renderTransition(routes, Flux, {...base})}
          </Router>
        )}</GothamContext.Consumer>
      </MuiThemeProvider >
    );
  }
}

export const Gotham = hot(module)(withStyles(styles, {withTheme: true})(GothamBase as any));
export default Gotham;
