import {WithStyles} from '@material-ui/core/styles';

export interface MenuContainerProps extends WithStyles<any> {
  readonly location: Location;
  readonly logo: JSX.Element;
  readonly menu: any[];
  readonly routes: any[];
  readonly title: string;
}

export interface MenuContainerState {
  readonly isMenuOpen: boolean;
}
