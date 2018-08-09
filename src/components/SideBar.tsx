import Divider from '@material-ui/core/Divider/Divider';
import Drawer from '@material-ui/core/Drawer/Drawer';
import Hidden from '@material-ui/core/Hidden/Hidden';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import {StyleRulesCallback, withStyles} from '@material-ui/core/styles';
import {Flux} from '@nlabs/arkhamjs';
import React from 'react';

import {AppConstants} from '../constants/AppConstants';
import {SideBarProps, SideBarState} from '../types/components/sideBar';

const styles: StyleRulesCallback = (theme) => ({
  drawerPaper: {
    position: 'relative'
  },
  menuIcon: {
    height: 16,
    marginRight: 0,
    width: 16
  },
  menuLabel: {
    paddingLeft: 10
  },
  toolbar: theme.mixins.toolbar
});

export class SideBarBase extends React.PureComponent<SideBarProps, SideBarState> {
  constructor(props: SideBarProps) {
    super(props);

    // Methods
    // this.onToggle = this.onToggle.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);

    // Initial state
    this.state = {
      isOpen: false
    };
  }

  // componentDidMount(): void {
  //   Flux.on(AppConstants.TOGGLE_MENU, this.onToggle);
  // }

  // componentWillUnmount(): void {
  //   Flux.off(AppConstants.TOGGLE_MENU, this.onToggle);
  // }

  // onToggle(): void {
  //   const {open} = this.props;
  //   this.setState({isOpen: !open});
  // }

  toggleDrawer(): void {
    Flux.dispatch({type: AppConstants.TOGGLE_MENU});
  }

  renderMenu(menu): JSX.Element {
    const {classes} = this.props;
    const menuItems = menu.map((item) => {
      const {label, icon} = item;

      if(label === '|') {
        return <Divider />;
      }

      return (
        <ListItem button key={label}>
          {icon && <ListItemIcon classes={{root: classes.menuIcon}}>{icon}</ListItemIcon>}
          <ListItemText classes={{root: classes.menuLabel}} primary={label} />
        </ListItem>
      );
    });

    return (
      <React.Fragment>
        <div className={classes.toolbar} />
        <List>
          {menuItems}
        </List>
      </React.Fragment>
    );
  }

  render(): JSX.Element {
    const {classes, menu, open} = this.props;

    return (
      <React.Fragment>
        <Hidden mdUp>
          <Drawer
            open={open}
            onClose={() => this.toggleDrawer()}>
            <div
              tabIndex={0}
              role="button"
              onClick={() => this.toggleDrawer()}
              onKeyDown={() => this.toggleDrawer()}>
              {this.renderMenu(menu)}
            </div>
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{paper: classes.drawerPaper}}
            open
            transitionDuration={{enter: 0.3, exit: 0.3}}
            variant="permanent">
            {this.renderMenu(menu)}
          </Drawer>
        </Hidden>
      </React.Fragment>
    );
  }
}

export const SideBar = withStyles(styles, {withTheme: true})(SideBarBase);
