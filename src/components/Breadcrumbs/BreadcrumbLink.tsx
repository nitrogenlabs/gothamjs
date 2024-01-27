import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';

export interface BreadcrumbLinkProps {
  readonly name: string;
  readonly path?: string;
}

export const BreadcrumbLink = ({name, path}: BreadcrumbLinkProps) => (path
  ? <Typography color="textPrimary" variant="inherit">{name}</Typography>
  : <MuiLink component={Link} to={path}>{name}</MuiLink>);

