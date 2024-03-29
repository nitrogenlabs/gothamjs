/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import Divider from '@material-ui/core/Divider/Divider';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import {makeStyles} from '@material-ui/styles';
import React from 'react';
import {matchPath, NavLink} from 'react-router-dom';

import {parseNavUrl} from '../../utils/viewUtils';
import {GothamMenuType} from '../../views/Gotham';

const useStyles: any = makeStyles((theme: any) => {
  const darkMode = theme.palette.type === 'dark';

  return {
    activeLink: {
      backgroundColor: '#fff',
      borderRight: `3px solid ${theme.palette.primary.dark}`,
      fontWeight: 700
    },
    headers: {
      alignItems: 'center',
      flexDirection: 'row',
      fontSize: 16,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      textTransform: 'uppercase',
      '&:hover': {
        color: darkMode ? theme.palette.primary.light : theme.palette.primary.main,
        backgroundColor: '#f7f7f7'
      },
      [theme.breakpoints.up('md')]: {
        fontSize: 14
      }
    },
    links: {
      alignItems: 'center',
      backgroundColor: '#e6e6e6',
      flexDirection: 'row',
      fontSize: 14,
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      '&:hover': {
        color: darkMode ? theme.palette.primary.light : theme.palette.primary.main,
        backgroundColor: '#f7f7f7'
      },
      [theme.breakpoints.up('md')]: {
        fontSize: 13
      }
    },
    menuIcon: {
      color: 'inherit',
      marginRight: 0,
      minWidth: 'auto'
    },
    menuItem: {
      fontSize: 'inherit'
    },
    menuLabel: {
      paddingLeft: 10
    },
    menuLink: {
      color: theme.palette.type === 'dark' ? theme.palette.neutral.light : theme.palette.neutral.dark,
      cursor: 'pointer',
      display: 'flex',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'none'
      }
    }
  };
});

export const getTypeClass = (type: GothamMenuType, classes: any): string =>
  (type === 'header' ? classes.headers : classes.links);

export interface SideBarMenuItemProps {
  readonly divider?: boolean;
  readonly icon: JSX.Element;
  readonly label: string;
  readonly path: string;
  readonly pathname?: string;
  readonly type?: GothamMenuType;
  readonly url: string;
}

export const SideBarMenuItem = (props: SideBarMenuItemProps): JSX.Element => {
  const {
    divider,
    icon,
    label,
    path,
    pathname,
    type = 'link',
    url
  } = props;
  const classes = useStyles({});
  let params = {};

  if(path) {
    const match = matchPath(pathname, {path});

    if(match) {
      const {params: matchParams} = match;
      params = matchParams;
    }
  }

  if(label === '|') {
    return <Divider />;
  }

  return (
    <li>
      <NavLink
        activeClassName={classes.activeLink}
        className={classes.menuLink}
        exact
        key={label} to={parseNavUrl(url, params)} >
        <ListItem
          button
          className={getTypeClass(type, classes)}
          disableRipple
          disableTouchRipple
          divider={divider}
          focusRipple={false}>
          {icon && <ListItemIcon classes={{root: classes.menuIcon}}>{icon}</ListItemIcon>}
          <ListItemText
            classes={{primary: classes.menuItem, root: classes.menuLabel}}
            primary={label}
            primaryTypographyProps={{variant: 'h4'}} />
        </ListItem>
      </NavLink>
    </li>
  );
};
