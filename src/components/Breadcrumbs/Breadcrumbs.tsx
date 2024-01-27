import MuiBreadcrumbs from '@mui/material/Breadcrumbs';

import {BreadcrumbLink, BreadcrumbLinkProps} from './BreadcrumbLink';

export interface BreadcrumbsProps {
  readonly className?: string;
  readonly items: BreadcrumbLinkProps[];
}

export const Breadcrumbs = ({className, items = []}: BreadcrumbsProps) => (
  <MuiBreadcrumbs aria-label="breadcrumb" className={className}>
    {items.map(({name, path}) => name && <BreadcrumbLink key={`${name}-${path}`} name={name} path={path} />)}
  </MuiBreadcrumbs >
);
