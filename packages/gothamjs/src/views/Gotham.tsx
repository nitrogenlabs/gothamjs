import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid/Grid';
import {createMuiTheme, MuiThemeProvider, StyleRulesCallback, withStyles} from '@material-ui/core/styles';
import {Flux} from '@nlabs/arkhamjs';
import {Logger, LoggerDebugLevel} from '@nlabs/arkhamjs-middleware-logger';
import {BrowserStorage} from '@nlabs/arkhamjs-storage-browser';
import {createBrowserHistory, History} from 'history';
import * as React from 'react';
import {hot} from 'react-hot-loader';
import Router from 'react-router-dom/Router';
import {createGlobalStyle} from 'styled-components';

import {AppActions} from '../actions/AppActions';
import {Config} from '../config/properties';
import {defaultTheme} from '../config/theme';
import {AppConstants} from '../constants/AppConstants';
import {AppStore} from '../stores/AppStore';
import {GothamConfiguration, GothamProps, GothamState} from '../types/gotham';
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
.container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  padding: 0 15px;
  margin: 0 auto;
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
    this.config = {...defaultConfig, ...appConfig};

    // ArkhamJS Middleware
    const env: string = Config.get('environment');
    const logger: Logger = new Logger({
      debugLevel: env === 'development' ? LoggerDebugLevel.DISPATCH : LoggerDebugLevel.DISABLED
    });

    // ArkhamJS Configuration
    const {middleware, name, stores, title} = this.config;
    const storage: BrowserStorage = new BrowserStorage({type: 'session'});

    Flux.init({
      middleware: [logger, ...middleware],
      name,
      state: {app: {title}},
      storage,
      stores: [AppStore, ...stores]
    });

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
    const {routes = []} = this.config;

    if(!isLoaded) {
      return null;
    }

    return (
      <MuiThemeProvider theme={this.theme}>
        <CssBaseline />
        <GlobalStyle />
        <Grid container>
          <Router history={this.history}>
            {renderTransition(routes)}
          </Router>
        </Grid>
      </MuiThemeProvider >
    );
  }
}

export const Gotham = hot(module)(withStyles(styles, {withTheme: true})(GothamBase));
export default Gotham;
