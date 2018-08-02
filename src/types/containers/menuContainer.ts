import {WithStyles} from '@material-ui/core/styles';

import {SideBarProps} from '../containers/sideBar';
import {TopBarProps} from '../containers/topBar';

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
