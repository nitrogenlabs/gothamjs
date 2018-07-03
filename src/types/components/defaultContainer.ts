import {WithStyles} from '@material-ui/core/styles';

export interface DefaultContainerProps extends WithStyles<any> {
  readonly location: Location;
  readonly logo: JSX.Element;
  readonly routes: any[];
  readonly siteTitle: string;
  readonly title: string;
}

export interface DefaultContainerState {
  readonly isTopSolid: boolean;
}
