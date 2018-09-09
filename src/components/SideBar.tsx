import Divider from '@material-ui/core/Divider/Divider';
import Drawer from '@material-ui/core/Drawer/Drawer';
import Hidden from '@material-ui/core/Hidden/Hidden';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import {StyleRulesCallback} from '@material-ui/core/styles';
import {Flux} from '@nlabs/arkhamjs';
import React from 'react';
import {NavLink} from 'react-router-dom';

import {AppConstants} from '../constants/AppConstants';
import {SideBarProps, SideBarState} from '../types/components/sideBar';
import {initStyle} from '../utils/components';

const styles: StyleRulesCallback = (theme) => ({
  drawer: {
    height: '100vh'
  },
  drawerPaper: {
    position: 'relative'
  },
  menuIcon: {
    height: 16,
    marginRight: 0,
    width: 16
  },
  menuLabel: {
    color: '#000',
    paddingLeft: 10
  },
  menuLink: {
    cursor: 'pointer',
    textDecoration: 'none'
  },
  sideBar: {
    display: 'flex',
    flexGrow: 0,
    flexShrink: 0
  },
  toolbar: theme.mixins.toolbar
});

export class SideBarBase extends React.Component<SideBarProps, SideBarState> {
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
      const {divider, label, icon, url} = item;

      if(label === '|') {
        return <Divider />;
      }

      return (
        <NavLink activeStyle={{fontWeight: 700}} className={classes.menuLink} to={url} exact>
          <ListItem
            button
            disableRipple
            disableTouchRipple
            divider={divider}
            focusRipple={false}
            key={label}>
            {icon && <ListItemIcon classes={{root: classes.menuIcon}}>{icon}</ListItemIcon>}
            <ListItemText
              classes={{root: classes.menuLabel}}
              primary={label}
              primaryTypographyProps={{variant: 'display4'}} />
          </ListItem>
        </NavLink>
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
      <div className={classes.sideBar}>
        <Hidden mdUp>
          <Drawer className={classes.drawer} open={open} onClose={() => this.toggleDrawer()}>
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
            className={classes.drawer}
            transitionDuration={{enter: 0.3, exit: 0.3}}
            variant="permanent">
            {this.renderMenu(menu)}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

export const SideBar = initStyle(SideBarBase, styles);
