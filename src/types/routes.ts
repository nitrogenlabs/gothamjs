export interface GothamRouteType {
  readonly asyncComponent: any;
  readonly path: string;
  readonly component: any;
  readonly exact: boolean;
  readonly isContainer: string;
  readonly routes: GothamRouteType[];
  readonly menu: any[];
  readonly siteTitle: string;
  readonly title: string;
}
