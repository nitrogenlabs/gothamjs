import {WithStyles} from '@material-ui/core/styles';

import {SideBarProps} from '../components/sideBar';
import {TopBarProps} from '../components/topBar';

export interface MenuContainerProps extends WithStyles<any> {
  readonly location: Location;
  readonly menu?: any[];
  readonly routes: any[];
  readonly sideBar?: SideBarProps;
  readonly title: string;
  readonly topBar?: TopBarProps;
}

export interface MenuContainerState {
  readonly isMenuOpen: boolean;
}
