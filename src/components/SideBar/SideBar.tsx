/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {Theme, useMediaQuery} from '@mui/material';
import Drawer, {DrawerProps} from '@mui/material/Drawer/Drawer';
import List from '@mui/material/List/List';
import styled from '@emotion/styled';
import {Flux} from '@nlabs/arkhamjs';
import {useFluxListener} from '@nlabs/arkhamjs-utils-react/lib';
import {FC, useState} from 'react';

import {GothamConstants} from '../../constants/GothamConstants';
import {GothamMenuItem} from '../../views/Gotham';
import {SideBarMenuItem, SideBarMenuItemProps} from './SideBarMenuItem';

export interface SideBarProps {
  readonly menu?: GothamMenuItem[];
  readonly pathname?: string;
  readonly top?: JSX.Element;
}

export interface DrawerStyledProps extends DrawerProps {
  readonly theme?: Theme;
}

export interface ListStyledProps extends DrawerProps {
  readonly theme?: Theme;
}

const SideBarStyled = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
`;

const DrawerStyled = styled(Drawer)<DrawerStyledProps>`${({theme}: DrawerStyledProps) => `
  .MuiDrawer-root {
    background-color: ${theme.palette.common.white},
    height: 100vh;
  }
  .MuiDrawer-paper {
    background-color: transparent;
    position: relative;
  }
`}`;

const ListStyled = styled(List)<ListStyledProps>`${({theme}: {theme: Theme}) => `
  padding-top: ${theme.spacing(3)};
`}`;

export const closeDrawer = (): void => {
  Flux.dispatch({openState: false, type: GothamConstants.TOGGLE_MENU});
};

export const toggleMenu = (setOpenState) => ({openState}) => setOpenState(openState);

export const renderMenu = (pathname: string, menu: any[] = []) =>
  menu.map((item: SideBarMenuItemProps): JSX.Element => {
    const {label, path} = item;
    return <SideBarMenuItem key={`${label}${path}`} pathname={pathname} {...item} />;
  });


export const SideBar: FC<SideBarProps> = ({menu, pathname, top}) => {
  const lgHidden: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const [isOpen, setIsOpen] = useState(false);

  useFluxListener(GothamConstants.TOGGLE_MENU, toggleMenu(setIsOpen));

  return (
    <SideBarStyled className="flex flex-column">
      {!lgHidden ? (
        <DrawerStyled
          open={isOpen}
          onClose={closeDrawer}>
          <div
            onClick={closeDrawer}
            onKeyDown={closeDrawer}
            role="button"
            tabIndex={0}>
            {top}
            <ListStyled>
              {menu.map(({label, path, url}) => (
                <SideBarMenuItem key={`${label}${path}${url}`} label={label} path={path} pathname={pathname} url={url}/>
              ))}
            </ListStyled>
          </div>
        </DrawerStyled>
      ) : (
        <DrawerStyled
          open
          transitionDuration={{enter: 0.3, exit: 0.3}}
          variant="permanent">
          {top}
          <ListStyled>{renderMenu(pathname, menu)}</ListStyled>
        </DrawerStyled>
      )}
    </SideBarStyled>
  );
};
