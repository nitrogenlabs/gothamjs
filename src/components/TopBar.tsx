import {StyleRulesCallback, withStyles} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Hidden from '@material-ui/core/Hidden/Hidden';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import {Flux} from '@nlabs/arkhamjs';
import {Backburger as BackburgerIcon, Menu as MenuIcon} from 'mdi-material-ui';
import * as React from 'react';
import NavLink from 'react-router-dom/NavLink';

import {Button} from '../components/Button';
import {AppConstants} from '../constants/AppConstants';
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
    Flux.on(AppConstants.TOPBAR_SOLID, this.onUpdateBackground);
  }

  componentWillUnmount() {
    Flux.off(AppConstants.TOPBAR_SOLID, this.onUpdateBackground);
  }

  onUpdateBackground(data) {
    const {isTransparent} = data;
    this.setState({isTransparent});
  }

  onToggleDrawer() {
    Flux.dispatch({type: AppConstants.TOGGLE_MENU});
  }

  renderMenuItem(menuItem: GothamMenuItem) {
    const {solidTextColor, transparentTextColor} = this.props;
    const {isTransparent} = this.state;
    const {label = '', url = ''} = menuItem;
    const color = isTransparent ? transparentTextColor : solidTextColor;
    return <Button href={url} key={`${label}:${url}`} color="inherit" style={{color}}>{label}</Button>;
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
    const {classes, logoAlt, logoDefault, menu, open, title} = this.props;
    const {isTransparent} = this.state;
    const appBarSolid = `${classes.appBar} ${classes.appBarSolid}`;
    const appBarTransparent = `${classes.appBar} ${classes.appBarTransparent}`;
    const titleText = isTransparent ? classes.titleTextTransparent : classes.titleTextSolid;

    return (
      <AppBar
        className={isTransparent ? appBarTransparent : appBarSolid}
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
            {isTransparent ? (logoAlt || logoDefault) : logoDefault}
            {this.renderTitle(title)}
          </NavLink>
          <div style={{flex: 1}} />
          {this.renderMenu(menu)}
        </Toolbar>
      </AppBar>
    );
  }
}

export const TopBar = withStyles(styles, {withTheme: true})(TopBarBase);
