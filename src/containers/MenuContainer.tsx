import {StyleRulesCallback, withStyles} from '@material-ui/core/styles';
import {Flux} from '@nlabs/arkhamjs';
import * as React from 'react';

import {AppConstants} from '../constants/AppConstants';
import {MenuContainerProps, MenuContainerState} from '../types/containers/menuContainer';
import {renderTransition} from '../utils/routes';
import {SideBar} from './SideBar';
import {TopBar} from './TopBar';

const styles: StyleRulesCallback = (theme) => ({
  content: {
    backgroundColor: theme.palette.background.default,
    flexGrow: 1,
    minWidth: 0,
    padding: theme.spacing.unit * 3
  }
});

export class MenuContainerBase extends React.PureComponent<MenuContainerProps, MenuContainerState> {
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
      return <SideBar menu={menu} open={isOpen} />;
    }

    return null;
  }

  render(): JSX.Element {
    const {classes, props: containerProps = {}, routes = [], title = ''} = this.props;
    const {sideBar: {logo, menu}} = containerProps;
    const {isMenuOpen} = this.state;

    return (
      <React.Fragment>
        <TopBar logo={logo} open={isMenuOpen} title={title} />
        {this.renderMenu(menu, isMenuOpen)}
        <div className={classes.content}>
          {renderTransition(routes)}
        </div>
      </React.Fragment>
    );
  }
}

export const MenuContainer = withStyles(styles, {withTheme: true})(MenuContainerBase);
export default MenuContainer;
