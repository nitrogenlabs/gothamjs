import {WithStyles} from '@material-ui/core/styles';

import {SideBarProps} from '../containers/sideBar';
import {TopBarProps} from '../containers/topBar';

export interface MenuContainerProps extends WithStyles<any> {
  readonly location: Location;
  readonly routes: any[];
  readonly props: MenuContainerConfig;
  readonly title: string;
}

export interface MenuContainerState {
  readonly isMenuOpen: boolean;
}

export interface MenuContainerConfig {
  readonly menu?: any[];
  readonly sideBar?: SideBarProps;
  readonly topBar?: TopBarProps;
}
