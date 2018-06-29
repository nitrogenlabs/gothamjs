import {StyleRulesCallback, WithStyles, withStyles} from '@material-ui/core/styles';
import {Flux} from 'arkhamjs';
import * as React from 'react';
import {Route} from 'react-router-dom';

import {AppConstants} from '../../constants/AppConstants';
import {SideMenu} from '../SideMenu/SideMenu';
import {TopBar} from '../TopBar/TopBar';

const styles: StyleRulesCallback = (theme) => ({
  content: {
    backgroundColor: theme.palette.background.default,
    flexGrow: 1,
    minWidth: 0,
    padding: theme.spacing.unit * 3
  }
});

interface Props {
  readonly logo: JSX.Element;
  readonly menu: any[];
  readonly routes: any[];
  readonly title: string;
}

export type MenuContainerProps = Props & WithStyles<typeof styles>;

export interface MenuContainerState {
  readonly isMenuOpen: boolean;
}

export class MenuContainerBase extends React.Component<MenuContainerProps, MenuContainerState> {
  constructor(props) {
    super(props);

    // Methods
    this.toggleMenu = this.toggleMenu.bind(this);

    // Initial state
    this.state = {
      isMenuOpen: false
    };
  }

  componentDidMount(): void {
    Flux.on(AppConstants.TOGGLE_MENU, this.toggleMenu);
  }

  componentWillUnmount(): void {
    Flux.off(AppConstants.TOGGLE_MENU, this.toggleMenu);
  }

  toggleMenu() {
    const {isMenuOpen} = this.state;
    this.setState({isMenuOpen: !isMenuOpen});
  }

  renderMenu(menu: any[], isOpen: boolean): JSX.Element {
    if(menu && menu.length) {
      return <SideMenu menu={menu} open={isOpen} />;
    }

    return null;
  }

  renderRoutes(routes: any[]): JSX.Element[] {
    return routes.map((route) => {
      const {path, component} = route;
      return <Route component={component} key={path} path={path} />;
    });
  }

  render(): JSX.Element {
    const {classes, logo, menu, routes, title} = this.props;
    const {isMenuOpen} = this.state;

    return (
      <React.Fragment>
        <TopBar logo={logo} open={isMenuOpen} title={title} />
        {this.renderMenu(menu, isMenuOpen)}
        <div className={classes.content}>
          {this.renderRoutes(routes)}
        </div>
      </React.Fragment>
    );
  }
}

export const MenuContainer = withStyles(styles, {withTheme: true})(MenuContainerBase);
