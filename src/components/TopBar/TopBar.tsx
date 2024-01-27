/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import AppBar from '@mui/material/AppBar/AppBar';
import Toolbar from '@mui/material/Toolbar/Toolbar';
import Typography from '@mui/material/Typography/Typography';
import styled from '@emotion/styled';
import {Flux} from '@nlabs/arkhamjs';
import {useEffect, useState} from 'react';
import {NavLink as Link} from 'react-router-dom';

import {Theme} from '../../config/theme';
import {GothamConstants} from '../../constants/GothamConstants';
import {useBreakpoint} from '../../utils/useBreakpoint';
import {GothamMenuItem} from '../../views/Gotham';
import {TopBarMenuIcon} from './TopBarMenuIcon';
import {TopBarMenuItem} from './TopBarMenuItem';

const TOPBAR_MAX_HEIGHT: number = 130;
const TOPBAR_MIN_HEIGHT: number = 64;
const TOPBAR_HEIGHT_TOLERANCE: number = 50;

export interface TopBarProps {
  readonly isOpen?: boolean;
  readonly logo?: JSX.Element;
  readonly logoAlt?: JSX.Element;
  readonly menu?: GothamMenuItem[];
  readonly solidTextColor?: string;
  readonly theme?: Theme;
  readonly title?: string;
  readonly transparent?: boolean;
  readonly transparentTextColor?: string;
  readonly user?: object;
}

const AppBarSolidStyled = styled(AppBar)`
  border-bottom: 1px solid ${({theme}: {theme: Theme}) => theme.palette.primary.main};
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0), 0px 3px 10px 0px rgba(0, 0, 0, .3);
  transition: all 0.3s ease-in-out;
  z-index: ${({theme}: {theme: Theme}) => theme.zIndex.drawer + 1};
`;

const AppBarTransparentStyled = styled(AppBar)`
  border-bottom: 1px solid transparent;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0), 0 0 0 0 rgba(0, 0, 0, 0), 0 0 0 0 rgba(0, 0, 0, 0);
  transition: all 0.3s ease-in-out;
  z-index: ${({theme}: {theme: Theme}) => theme.zIndex.drawer + 1};
`;

const ToolbarSolidStyled = styled(Toolbar)`
  color:  ${({theme}: {theme: Theme}) => theme.palette.primary.light};
  height: ${TOPBAR_MAX_HEIGHT}px;
  justify-content: space-between;
  padding-left: 0;
  transition: all 0.3s ease-in-out;

  ${({theme}: {theme: Theme}) => theme.breakpoints.up('md')} {
    padding-left: ${({theme}: {theme: Theme}) => theme.spacing(3)}px;
  }
`;

const ToolbarTransparentStyled = styled(Toolbar)`
  color:  ${({theme}: {theme: Theme}) => theme.palette.primary.dark};
  height: ${TOPBAR_MAX_HEIGHT}px;
  justify-content: space-between;
  padding-left: 0;
  transition: all 0.3s ease-in-out;

  ${({theme}: {theme: Theme}) => theme.breakpoints.up('md')} {
    padding-left: ${({theme}: {theme: Theme}) => theme.spacing(3)}px;
  }
`;

export interface TopBarState {
  readonly isTransparent: boolean;
}

export const onToggleDrawer = (openState: boolean) => {
  Flux.dispatch({openState, type: GothamConstants.TOGGLE_MENU});
};

export const renderTitle = (title: string = ''): JSX.Element => {
  if(title !== '') {
    return <Typography variant="h1" color="inherit" noWrap>{title}</Typography>;
  }

  return null;
};

export const calculateStyles = (forceHeight?: number): any => {
  const {scrollY} = window;
  const tolerance: number = scrollY - TOPBAR_HEIGHT_TOLERANCE;

  // Calculate height
  let updatedHeight: number = TOPBAR_MAX_HEIGHT - tolerance;

  if(tolerance > TOPBAR_MAX_HEIGHT) {
    updatedHeight = TOPBAR_MAX_HEIGHT - (tolerance - TOPBAR_MAX_HEIGHT);

    if(updatedHeight < TOPBAR_MIN_HEIGHT) {
      updatedHeight = TOPBAR_MIN_HEIGHT;
    } else if(updatedHeight > TOPBAR_MAX_HEIGHT) {
      updatedHeight = TOPBAR_MAX_HEIGHT;
    }
  } else {
    updatedHeight = TOPBAR_MAX_HEIGHT;
  }

  // Calculate opacity
  const opacityHeight: number = updatedHeight - TOPBAR_MIN_HEIGHT;
  const opacity: number = (opacityHeight > 0) ? 1 - (opacityHeight / TOPBAR_MIN_HEIGHT) : 1;

  return {backgroundColor: `rgba(0, 0, 0, ${opacity})`, height: forceHeight ? forceHeight : updatedHeight};
};

export const onScroll = (setTopState, setStyle) => (): void => {
  const {scrollY} = window;
  setStyle(calculateStyles());
  setTopState((TOPBAR_MAX_HEIGHT + TOPBAR_MIN_HEIGHT + TOPBAR_HEIGHT_TOLERANCE) > scrollY);
};

export const TopBar = (props: TopBarProps) => {
  const {
    isOpen,
    logo,
    logoAlt,
    menu = [],
    solidTextColor,
    theme,
    title,
    transparent = false,
    transparentTextColor
  } = props;
  const [isTransparent, setTopState] = useState(transparent);
  const [barStyles, setStyle] = useState({backgroundColor: 'rgba(0, 0, 0, 0)', height: TOPBAR_MAX_HEIGHT});
  const {backgroundColor: barStyleBg, height: barStyleHeight} = barStyles;
  const breakpoint = useBreakpoint();
  const isMobile: boolean = breakpoint.down('sm');
  const menuIconColor = transparentTextColor || solidTextColor || theme.palette.primary.dark;
  const backgroundColor: string = transparent ? barStyleBg : '#000';
  const height: number = transparent ? barStyleHeight : TOPBAR_MIN_HEIGHT;

  useEffect(() => {
    if(transparent) {
      window.addEventListener('scroll', onScroll(setTopState, setStyle));
      return () => window.removeEventListener('scroll', onScroll(setTopState, setStyle));
    }

    return () => { };
  }, [transparent]);

  useEffect(() => {
    if(isMobile) {
      setStyle(calculateStyles(TOPBAR_MIN_HEIGHT));
    } else {
      setStyle(calculateStyles());
    }
  }, [isMobile]);

  const AppBarStyled: any = isTransparent ? AppBarTransparentStyled : AppBarSolidStyled;
  const ToolbarStyled: any = isTransparent ? ToolbarTransparentStyled : ToolbarSolidStyled;

  return (
    <AppBarStyled
      position="absolute"
      style={{backgroundColor}}>
      <ToolbarStyled
        disableGutters
        style={{height}}>
        <TopBarMenuIcon iconColor={menuIconColor} isOpen={isOpen} onToggle={onToggleDrawer}/>
        <Link to="/">
          {isTransparent ? (logoAlt || logo) : logo}
          {renderTitle(title)}
        </Link>
        <div className="d-none d-md-flex" />
        {menu.map((menuItem) => (
          <TopBarMenuItem
            isTransparent={isTransparent}
            menuItem={menuItem}
            solidTextColor={solidTextColor}
            transparentTextColor={transparentTextColor}/>
        ))}
      </ToolbarStyled>
    </AppBarStyled>
  );
};
