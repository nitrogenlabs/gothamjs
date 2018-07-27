import {Location} from 'history';

export interface GothamRouteType {
  readonly asyncComponent?: any;
  readonly component?: any;
  readonly container?: string;
  readonly exact?: boolean;
  readonly location?: Location;
  readonly name?: string;
  readonly path?: string;
  readonly props?: any;
  readonly routes?: GothamRouteType[];
  readonly sensitive?: boolean;
  readonly strict?: boolean;
  readonly title?: string;
  readonly view?: string;
}
