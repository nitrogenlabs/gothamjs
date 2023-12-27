import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import isEmpty from 'lodash/isEmpty';
import React from 'react';

import {BreadcrumbLink, BreadcrumbLinkProps} from './BreadcrumbLink';

export interface BreadcrumbsProps {
  readonly className?: string;
  readonly classes?: any;
  readonly items: BreadcrumbLinkProps[];
}

export const Breadcrumbs = ({classes, className, items = []}: BreadcrumbsProps) => (
  <MuiBreadcrumbs aria-label="breadcrumb" className={className}>
    {items.map(({name, path}) => !isEmpty(name) && <BreadcrumbLink key={`${name}-${path}`} classes={classes} name={name} path={path} />)}
  </MuiBreadcrumbs >
);
