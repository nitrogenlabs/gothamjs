/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {StyleRulesCallback, withStyles} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Hidden from '@material-ui/core/Hidden/Hidden';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import {Flux} from '@nlabs/arkhamjs';
import {Backburger as BackburgerIcon, Menu as MenuIcon} from 'mdi-material-ui';
import * as React from 'react';
import {NavLink} from 'react-router-dom';

import {GothamActions} from '../actions/GothamActions';
import {Button} from '../components/Button';
import {GothamConstants} from '../constants/GothamConstants';
import {TopBarProps, TopBarState} from '../types/components/topBar';
import {GothamMenuItem} from '../types/gotham';

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
  homeLink: {
    display: 'flex'
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

export class TopBarBase extends React.PureComponent<TopBarProps, TopBarState> {
  static defaultProps: object = {
    menu: [],
    solidTextColor: '#fff',
    transparent: false,
    transparentTextColor: '#fff'
  };

  constructor(props: TopBarProps) {
    super(props);

    // Methods
    this.onToggleDrawer = this.onToggleDrawer.bind(this);
    this.onUpdateBackground = this.onUpdateBackground.bind(this);

    this.state = {
      isTransparent: props.transparent
    };
  }

  componentDidMount() {
    Flux.on(GothamConstants.TOPBAR_SOLID, this.onUpdateBackground);
  }

  componentWillUnmount() {
    Flux.off(GothamConstants.TOPBAR_SOLID, this.onUpdateBackground);
  }

  onUpdateBackground(data) {
    const {isTransparent} = data;
    this.setState({isTransparent});
  }

  onToggleDrawer() {
    Flux.dispatch({type: GothamConstants.TOGGLE_MENU});
  }

  renderMenuItem(menuItem: GothamMenuItem) {
    const {solidTextColor, transparentTextColor} = this.props;
    const {isTransparent} = this.state;
    const {label = '', url = ''} = menuItem;
    const color = isTransparent ? transparentTextColor : solidTextColor;
    return (
      <Button
        color="inherit"
        key={`${label}:${url}`}
        onClick={() => GothamActions.navGoto(url)}
        style={{color}}>
        {label}
      </Button>
    );
  }

  renderMenu(menu) {
    return menu.map((menuItem) => this.renderMenuItem(menuItem));
  }

  renderTitle(title: string = ''): JSX.Element {
    if(title !== '') {
      return <Typography variant="title" color="inherit" noWrap>{title}</Typography>;
    }

    return null;
  }

  render(): JSX.Element {
    const {classes, logo, logoAlt, menu, open, title} = this.props;
    const {isTransparent} = this.state;
    const appBarSolid = `${classes.appBar} ${classes.appBarSolid}`;
    const appBarTransparent = `${classes.appBar} ${classes.appBarTransparent}`;
    const titleText = isTransparent ? classes.titleTextTransparent : classes.titleTextSolid;

    return (
      <AppBar
        className={isTransparent ? appBarTransparent : appBarSolid}
        position="sticky">
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
            {isTransparent ? (logoAlt || logo) : logo}
            {this.renderTitle(title)}
          </NavLink>
          <div style={{flex: 1}} />
          {this.renderMenu(menu)}
        </Toolbar>
      </AppBar>
    );
  }
}

export const TopBar = withStyles(styles, {withTheme: true})(TopBarBase as any);
