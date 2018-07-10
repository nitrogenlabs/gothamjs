import {StyleRulesCallback, withStyles} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Button from '@material-ui/core/Button/Button';
import Hidden from '@material-ui/core/Hidden/Hidden';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import {Flux} from '@nlabs/arkhamjs';
import {Backburger as BackburgerIcon, Menu as MenuIcon} from 'mdi-material-ui';
import * as React from 'react';
import NavLink from 'react-router-dom/es/NavLink';

import {AppConstants} from '../../constants/AppConstants';
import {TopBarProps} from '../../types/components/topBar';

const styles: StyleRulesCallback = (theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  appBarSolid: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    boxShadow: '0 5px 10px 0 rgba(0, 0, 0, 0), 0px 3px 10px 0px rgba(0, 0, 0, .3)',
    transition: 'all 0.3s ease-in-out'
  },
  appBarTransparent: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderBottom: '1px solid transparent',
    boxShadow: '0 0 0 0 rgba(0, 0, 0, 0), 0 0 0 0 rgba(0, 0, 0, 0), 0 0 0 0 rgba(0, 0, 0, 0)',
    transition: 'all 0.3s ease-in-out'
  },
  titleTextSolid: {
    color: theme.palette.primary.light,
    transition: 'all 0.3s ease-in-out'
  },
  titleTextTransparent: {
    color: theme.palette.primary.dark,
    transition: 'all 0.3s ease-in-out'
  }
});

export class TopBarBase extends React.PureComponent<TopBarProps> {
  constructor(props: TopBarProps) {
    super(props);

    // Methods
    this.onToggleDrawer = this.onToggleDrawer.bind(this);
  }

  onToggleDrawer() {
    Flux.dispatch({type: AppConstants.TOGGLE_MENU});
  }

  renderMenu(user) {
    if(user) {
      return (
        <React.Fragment>
          <Button color="inherit">Logout</Button>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Button color="inherit">Signup</Button>
        <Button color="inherit">Login</Button>
      </React.Fragment>
    );
  }

  renderTitle(title: string = ''): JSX.Element {
    if(title !== '') {
      return <Typography variant="title" color="inherit" noWrap>{title}</Typography>;
    }

    return null;
  }

  render(): JSX.Element {
    const {classes, logo, open, title, transparent, user} = this.props;
    const appBarSolid = `${classes.appBar} ${classes.appBarSolid}`;
    const appBarTransparent = `${classes.appBar} ${classes.appBarTransparent}`;
    const titleText = transparent ? classes.titleTextTransparent : classes.titleTextSolid;

    return (
      <AppBar
        className={transparent ? appBarTransparent : appBarSolid}
        position="fixed">
        <Toolbar classes={{root: titleText}}>
          <Hidden mdUp>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.onToggleDrawer}>
              {open ? <BackburgerIcon /> : <MenuIcon />}
            </IconButton>
          </Hidden>
          <NavLink to="/">
            {logo}
            {this.renderTitle(title)}
          </NavLink>
          <div style={{flex: 1}} />
          {this.renderMenu(user)}
        </Toolbar>
      </AppBar>
    );
  }
}

export const TopBar = withStyles(styles, {withTheme: true})(TopBarBase);
