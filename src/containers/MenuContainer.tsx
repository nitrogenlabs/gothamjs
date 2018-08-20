import {StyleRulesCallback, withStyles} from '@material-ui/core/styles';
import {Flux} from '@nlabs/arkhamjs';
import * as React from 'react';

import {SideBar} from '../components/SideBar';
import {TopBar} from '../components/TopBar';
import {AppConstants} from '../constants/AppConstants';
import {SideBarProps} from '../types/components/sideBar';
import {MenuContainerProps, MenuContainerState} from '../types/containers/menuContainer';
import {renderTransition} from '../utils/routes';

const styles: StyleRulesCallback = (theme) => ({
  container: {
    display: 'flex',
    flex: 1
  },
  content: {
    backgroundColor: theme.palette.background.default,
    flexGrow: 1,
    minWidth: 0,
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
    // Add listener
    Flux.on(AppConstants.TOGGLE_MENU, this.toggleMenu);
  }

  componentWillUnmount(): void {
    // Remove listener
    Flux.off(AppConstants.TOGGLE_MENU, this.toggleMenu);
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
    const {classes, sideBar, routes = [], topBar = {}} = this.props;
    const {isMenuOpen} = this.state;

    return (
      <React.Fragment>
        <TopBar {...topBar} transparent open={isMenuOpen} />
        <div className={classes.container}>
          {this.renderMenu(sideBar, isMenuOpen)}
          <div className={classes.content}>
            {renderTransition(routes)}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export const MenuContainer = withStyles(styles, {withTheme: true})(MenuContainerBase);
export default MenuContainer;
