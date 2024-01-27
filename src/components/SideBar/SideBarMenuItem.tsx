/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import Divider from '@mui/material/Divider/Divider';
import ListItem, {ListItemProps} from '@mui/material/ListItem/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon/ListItemIcon';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import styled from '@emotion/styled';
import {FC, ReactNode} from 'react';
import {matchPath, NavLink, NavLinkProps} from 'react-router-dom';
import {Theme} from '@mui/material';

import {parseNavUrl} from '../../utils/viewUtils';
import {GothamMenuType} from '../../views/Gotham';

export interface SideBarMenuItemProps {
  readonly divider?: boolean;
  readonly icon?: ReactNode;
  readonly label: string;
  readonly path: string;
  readonly pathname?: string;
  readonly type?: GothamMenuType;
  readonly url: string;
}

interface NavLinkStyledProps extends NavLinkProps {
  readonly theme?: Theme;
}

interface LinkStyledProps extends ListItemProps {
  readonly theme?: Theme;
}

const NavLinkStyled = styled(NavLink)<NavLinkStyledProps>`${({theme}) => `
  color: ${theme.palette.common.black};
  cursor: pointer;
  display: flex;
  textDecoration: none;

  &.active {
    background-color: #fff;
    border-right: 3px solid ${theme.palette.primary.dark};
    fontWeight: 700;
  }

  &:hover {
    textDecoration: none;
  }
`}`;

const HeaderStyled = styled(ListItem)<LinkStyledProps>`${({theme}) => `
  align-items: center;
  flex-direction: row;
  font-size: 16;
  padding-left: ${theme.spacing(2)}
  padding-right: ${theme.spacing(2)}
  text-transform: uppercase;

  &:hover {
    color: ${theme.palette.primary[500]};
    background-color: #f7f7f7;
  }

  ${theme.breakpoints.up('md')} {
    fontSize: 14;
  }
`}`;

const LinkStyled = styled(ListItem)<LinkStyledProps>`${({theme}) => `
  align-items: center;
  background-color: #e6e6e6;
  flex-direction: row;
  font-size: 14;
  padding-left: ${theme.spacing(3)};
  padding-right: ${theme.spacing(3)};

  &:hover {
    color: ${theme.palette.primary[500]},
    background-color: #f7f7f7;
  }

  ${theme.breakpoints.up('md')} {
    font-size: 13;
  }
`}`;

const ListItemTextStyled = styled(ListItemText)`
  .MuiListItemText-root {
    padding-left: 10;
  }

  .MuiListItemText-primary {
    font-size: inherit;
  }
`;

const ListItemIconStyled = styled(ListItemIcon)`
  color: inherit;
  margin-right: 0;
  min-width: auto;
`;

export const getTypeClass = (type: GothamMenuType, classes: any): string =>
  (type === 'header' ? classes.headers : classes.links);

export const SideBarMenuItem: FC<SideBarMenuItemProps> = ({
  divider,
  icon,
  label,
  path,
  pathname,
  type = 'link',
  url
}) => {
  let params = {};

  if(path) {
    const match = matchPath(path, pathname);// matchPath(pathname, {path});

    if(match) {
      const {params: matchParams} = match;
      params = matchParams;
    }
  }

  if(label === '|') {
    return <Divider />;
  }

  const ListItemStyled = type === 'header' ? HeaderStyled : LinkStyled;

  return (
    <li>
      <NavLinkStyled
        key={label}
        to={parseNavUrl(url, params)}>
        <ListItemStyled divider={divider}>
          {icon && <ListItemIconStyled>{icon}</ListItemIconStyled>}
          <ListItemTextStyled
            primary={label}
            primaryTypographyProps={{variant: 'h4'}} />
        </ListItemStyled>
      </NavLinkStyled>
    </li>
  );
};
