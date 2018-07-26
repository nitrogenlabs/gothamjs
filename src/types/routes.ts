import {Location} from 'history';

import {SideBarProps} from './components/sideBar';
import {TopBarProps} from './components/topBar';

export interface GothamRouteType {
  readonly asyncComponent: any;
  readonly component: any;
  readonly container: string;
  readonly exact: boolean;
  readonly location: Location;
  readonly menu: any[];
  readonly path: string;
  readonly routes: GothamRouteType[];
  readonly sensitive: boolean;
  readonly sideBar?: SideBarProps;
  readonly strict: boolean;
  readonly title: string;
  readonly topBar?: TopBarProps;
  readonly view: string;
}
