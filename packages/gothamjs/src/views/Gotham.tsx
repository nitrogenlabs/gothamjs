/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import 'bootstrap/dist/css/bootstrap-grid.css';
import 'bootstrap/dist/css/bootstrap-reboot.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import {createMuiTheme, MuiThemeProvider, StyleRulesCallback, withStyles} from '@material-ui/core/styles';
import {Flux} from '@nlabs/arkhamjs';
import {Logger, LoggerDebugLevel} from '@nlabs/arkhamjs-middleware-logger';
import {BrowserStorage} from '@nlabs/arkhamjs-storage-browser';
import {createBrowserHistory, History} from 'history';
import merge from 'lodash/merge';
import {Close as CloseIcon} from 'mdi-material-ui';
import * as React from 'react';
import {hot} from 'react-hot-loader';
import Router from 'react-router-dom/Router';
import {createGlobalStyle} from 'styled-components';

import {GothamActions} from '../actions/GothamActions';
import {Loader} from '../components/Loader';
import {Notification} from '../components/Notification';
import {Config} from '../config/app';
import {defaultTheme} from '../config/theme';
import {GothamConstants} from '../constants/GothamConstants';
import {AuthStore} from '../stores/AuthStore/AuthStore';
import {GothamAppStore} from '../stores/GothamAppStore/GothamAppStore';
import {GothamConfiguration, GothamProps, GothamState} from '../types/gotham';
import {GothamContext} from '../utils/GothamProvider';
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

const styles: StyleRulesCallback = (theme) => ({
  close: {
    padding: theme.spacing.unit / 2
  }
});

export class GothamBase extends React.PureComponent<GothamProps, GothamState> {
  config: GothamConfiguration;
  history: History;
  notifications: any[] = [];
  state: any = {};
  theme;

  constructor(props: GothamProps) {
    super(props);
    // Methods
    this.addNotification = this.addNotification.bind(this);
    this.init = this.init.bind(this);
    this.navBack = this.navBack.bind(this);
    this.navForward = this.navForward.bind(this);
    this.navGoto = this.navGoto.bind(this);
    this.navReplace = this.navReplace.bind(this);
    this.onNotificationClose = this.onNotificationClose.bind(this);
    this.onNotificationExit = this.onNotificationExit.bind(this);
    this.processNotifications = this.processNotifications.bind(this);
    this.toggleLoader = this.toggleLoader.bind(this);

    // Configuration
    const {config: appConfig = {}} = props;
    const defaultConfig: GothamConfiguration = {
      middleware: [],
      routes: [],
      storageType: 'session',
      stores: [],
      title: ''
    };

    // Save config to app
    this.config = merge(defaultConfig, appConfig);
    Config.set(this.config);

    const {
      middleware,
      name,
      storageType,
      stores,
      theme
      // title
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
        // state: {app: {title}},
        storage,
        stores: [GothamAppStore, AuthStore, ...stores]
      });
    }

    // Create browser history
    this.history = createBrowserHistory();

    // Create theme
    this.theme = theme && createMuiTheme(theme || defaultTheme);

    this.state = {
      currentNotification: {},
      hasNotification: false,
      isAppLoaded: false,
      isLoading: false
    };
  }

  componentDidMount(): void {
    // Add event listeners
    Flux.onInit(this.init);
    Flux.on(GothamConstants.LOADING, this.toggleLoader);
    Flux.on(GothamConstants.NAV_BACK, this.navBack);
    Flux.on(GothamConstants.NAV_FORWARD, this.navForward);
    Flux.on(GothamConstants.NAV_GOTO, this.navGoto);
    Flux.on(GothamConstants.NAV_REPLACE, this.navReplace);
    Flux.on(GothamConstants.NOTIFY, this.addNotification);

    // Initialize
    GothamActions.init();
  }

  componentWillUnmount(): void {
    // Remove event listeners
    Flux.off(GothamConstants.NOTIFY, this.addNotification);
    Flux.offInit(this.init);
    Flux.off(GothamConstants.NAV_BACK, this.navBack);
    Flux.off(GothamConstants.NAV_FORWARD, this.navForward);
    Flux.off(GothamConstants.NAV_GOTO, this.navGoto);
    Flux.off(GothamConstants.NAV_REPLACE, this.navReplace);
    Flux.off(GothamConstants.LOADING, this.toggleLoader);
  }

  init(): void {
    const {onInit} = this.config;

    if(onInit) {
      onInit();
    }

    this.setState({isAppLoaded: true});
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

  // NOTIFICATION
  addNotification({notification}) {
    this.notifications.push(notification);
    this.processNotifications();
  }

  onNotificationClose(event: any, reason?: string) {
    if(reason === 'clickaway') {
      return;
    }

    this.setState({hasNotification: false});
  }

  onNotificationExit() {
    this.processNotifications();
  }

  processNotifications() {
    if(this.notifications.length > 0) {
      this.setState({currentNotification: this.notifications.shift(), hasNotification: true});
    }
  }

  // Loader
  toggleLoader({isLoading}) {
    this.setState({isLoading});
  }

  renderLoading(): JSX.Element {
    const {isLoading} = this.state;

    if(!isLoading) {
      return null;
    }

    return <Loader />;
  }

  renderNotification(): JSX.Element {
    const {classes} = this.props;
    const {currentNotification, hasNotification: open} = this.state;
    const {key, message, status} = currentNotification;

    return (
      <Snackbar
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        autoHideDuration={10000}
        key={key}
        onClose={this.onNotificationClose}
        onExited={this.onNotificationExit}
        open={open}
        ContentProps={{'aria-describedby': 'message-id'}}
        message={<span id="message-id">{message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            className={classes.close}
            color="inherit"
            onClick={this.onNotificationClose}>
            <CloseIcon />
          </IconButton>
        ]}>
        <Notification
          message={message}
          onClose={this.onNotificationClose}
          variant={status} />
      </Snackbar>
    );
  }

  render(): JSX.Element {
    const {isAppLoaded} = this.state;

    if(!isAppLoaded) {
      return <Loader />;
    }

    const {isAuth, routes = [], ...gothamConfig} = this.config;
    const {Flux} = this.context;

    return (
      <MuiThemeProvider theme={this.theme}>
        <CssBaseline />
        <GlobalStyle />
        <GothamContext.Provider value={{Flux, isAuth}}>
          <Router history={this.history}>
            {renderTransition(routes, Flux, {...gothamConfig, isAuth})}
          </Router>
        </GothamContext.Provider>
        {this.renderNotification()}
      </MuiThemeProvider >
    );
  }
}

GothamBase.contextType = GothamContext;

export const Gotham = hot(module)(withStyles(styles, {withTheme: true})(GothamBase as any));
export default Gotham;
