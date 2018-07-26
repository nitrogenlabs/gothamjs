import {Location} from 'history';

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
  readonly siteTitle: string;
  readonly strict: boolean;
  readonly title: string;
  readonly view: string;
}
