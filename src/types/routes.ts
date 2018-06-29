import {Location} from 'history';

export interface GothamRouteType {
  readonly asyncComponent: any;
  readonly component: any;
  readonly exact: boolean;
  readonly isContainer: string;
  readonly location: Location;
  readonly menu: any[];
  readonly path: string;
  readonly routes: GothamRouteType[];
  readonly sensitive: boolean;
  readonly siteTitle: string;
  readonly strict: boolean;
  readonly title: string;
}
