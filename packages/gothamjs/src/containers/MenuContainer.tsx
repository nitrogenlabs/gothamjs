import {StyleRulesCallback, withStyles} from '@material-ui/core/styles';
import * as React from 'react';

import {SideBar} from '../components/SideBar';
import {TopBar} from '../components/TopBar';
import {GothamConstants} from '../constants/GothamConstants';
import {SideBarProps} from '../types/components/sideBar';
import {MenuContainerProps, MenuContainerState} from '../types/containers/menuContainer';
import {renderTransition} from '../utils/routes';

/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
const styles: StyleRulesCallback = (theme) => ({
  container: {
    display: 'flex',
    flex: 1
  },
  content: {
    backgroundColor: theme.palette.background.default,
    flexGrow: 1,
    marginBottom: 50,
    minWidth: 0,
    overflowY: 'auto',
    paddingLeft: 15,
    paddingRight: 15
  }
});

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
    const {Flux} = this.props;

    // Add listener
    Flux.on(GothamConstants.TOGGLE_MENU, this.toggleMenu);
  }

  componentWillUnmount(): void {
    const {Flux} = this.props;

    // Remove listener
    Flux.off(GothamConstants.TOGGLE_MENU, this.toggleMenu);
  }

  shouldComponentUpdate(nextProps) {
    const {location: {pathname}} = this.props;
    const {location: {pathname: nextPath}} = nextProps;

    return pathname !== nextPath;
  }

  toggleMenu() {
    const {isMenuOpen} = this.state;
    this.setState({isMenuOpen: !isMenuOpen});
  }

  renderMenu(props: SideBarProps, isOpen: boolean): JSX.Element {
    if(props) {
      return <SideBar {...props} open={isOpen} />;
    }

    return null;
  }

  render(): JSX.Element {
    const {baseProps, classes, Flux, sideBar, routes = [], topBar = {}} = this.props;
    const {isMenuOpen} = this.state;

    return (
      <React.Fragment>
        <TopBar {...topBar} transparent open={isMenuOpen} />
        <div className={classes.container}>
          {this.renderMenu(sideBar, isMenuOpen)}
          <div className={classes.content}>
            {renderTransition(routes, Flux, baseProps)}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export const MenuContainer = withStyles(styles, {withTheme: true})(MenuContainerBase as any);
export default MenuContainer;
