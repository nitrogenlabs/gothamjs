import {Breadcrumbs as MuiBreadcrumbs} from '@material-ui/core';
import isEmpty from 'lodash/isEmpty';
import React from 'react';

import {BreadcrumbLink} from './BreadcrumbLink';
import {BreadcrumbsProps} from './Breadcrumbs.types';

export const Breadcrumbs = ({classes, className, items = []}: BreadcrumbsProps) => (
  <MuiBreadcrumbs aria-label="breadcrumb" className={className}>
    {items.map(({name, path}) => !isEmpty(name) && <BreadcrumbLink key={`${name}-${path}`} classes={classes} name={name} path={path} />)}
  </MuiBreadcrumbs >
);
