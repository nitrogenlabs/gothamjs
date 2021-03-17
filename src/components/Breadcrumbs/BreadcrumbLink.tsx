import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import isEmpty from 'lodash/isEmpty';
import React from 'react';
import {Link} from 'react-router-dom';

import {BreadcrumbLinkProps} from './Breadcrumbs.types';

export const BreadcrumbLink = ({classes, name, path}: BreadcrumbLinkProps) => (isEmpty(path)
  ? <Typography color="textPrimary" variant="inherit">{name}</Typography>
  : <MuiLink classes={classes} component={Link} to={path}>{name}</MuiLink>);

