import {createMuiTheme, MuiThemeProvider, StyleRulesCallback, withStyles} from '@material-ui/core/styles';
import {Logger, LoggerDebugLevel} from '@nlabs/arkhamjs-middleware-logger';
import {BrowserStorage} from '@nlabs/arkhamjs-storage-browser';
import {Flux} from 'arkhamjs';
import {createBrowserHistory, History} from 'history';
import * as React from 'react';
import {hot} from 'react-hot-loader';
import {Router} from 'react-router-dom';

import {Config} from '../../config/properties';
import {defaultTheme} from '../../config/theme';
import {AppConstants} from '../../constants/AppConstants';
import {AppStore} from '../../stores';
import {GothamProps, GothamState} from '../../types/views/gotham';
import {renderRoutes} from '../../utils/routes';

const styles: StyleRulesCallback = () => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    overflow: 'hidden',
    position: 'relative',
    zIndex: 1
  }
});

export class GothamBase extends React.Component<GothamProps, GothamState> {
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

    // ArkhamJS Middleware
    const env: string = Config.get('environment');
    const logger: Logger = new Logger({
      debugLevel: env === 'development' ? LoggerDebugLevel.DISPATCH : LoggerDebugLevel.DISABLED
    });

    // ArkhamJS Configuration
    const storage: BrowserStorage = new BrowserStorage({type: 'session'});

    Flux.init({
      middleware: [logger],
      storage,
      stores: [AppStore]
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
    Flux.onInit(this.init);
    Flux.on(AppConstants.NAV_BACK, this.navBack);
    Flux.on(AppConstants.NAV_FORWARD, this.navForward);
    Flux.on(AppConstants.NAV_GOTO, this.navGoto);
    Flux.on(AppConstants.NAV_REPLACE, this.navReplace);
  }

  componentWillUnmount(): void {
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
    const {classes, routes, title} = this.props;
    const {isLoaded} = this.state;

    if(!isLoaded) {
      return null;
    }

    return (
      <MuiThemeProvider theme={this.theme}>
        <div className={classes.root}>
          <Router history={this.history}>
            <React.Fragment>
              {renderRoutes(routes, title)}
            </React.Fragment>
          </Router>
        </div>
      </MuiThemeProvider >
    );
  }
}

export const Gotham = hot(module)(withStyles(styles, {withTheme: true})(GothamBase));
