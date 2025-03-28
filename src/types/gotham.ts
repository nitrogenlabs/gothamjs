import type {RouteProps} from 'react-router';

export type GothamRouteData = RouteProps & {
  readonly authenticate?: boolean;
  // readonly component?: any;
  // readonly container?: 'default' | 'menu';
  // readonly exact?: boolean;
  // readonly isAuth?: () => boolean;
  // readonly location?: Location;
  // readonly name?: string;
  // readonly path?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly props?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly children?: any ; // GothamRouteData[];
  // readonly sensitive?: boolean;
  // readonly strict?: boolean;
  // readonly title?: string;
  // readonly view?: 'confirm' | 'default'| 'home' | 'markdown' | 'menu' | 'signIn' | 'notfound';
};
