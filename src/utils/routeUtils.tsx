/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
// import {Flux, FluxFramework} from '@nlabs/arkhamjs';
// import {ReactNode} from 'react';
import {AuthRoute} from '../components/AuthRoute/AuthRoute.js';

import type {RouteObject} from 'react-router';

// import {lazyImport} from './dynamicUtils';
// import {GothamActions} from '../actions/GothamActions';
// import {GothamRoute} from '../components/GothamRoute/GothamRoute';
// import {Loader} from '../components/Loader/Loader';
// import {type GothamConfiguration} from '../views/Gotham/GothamProvider';

// import type {GothamRouteData} from '../types/gotham';

// const {NotFoundView} = lazyImport(() => import('../views/NotFoundView/NotFoundView'), 'NotFoundView');

// export interface RouteViewProps {
//   loader?: typeof Loader;
//   gothamConfig: GothamConfiguration;
//   Flux: FluxFramework;
//   props?: Record<string, unknown>;
//   title?: string;
//   [key: string]: unknown;
// }

// export const fadeTransition = {
//   atActive: {
//     opacity: 1,
//     position: 'relative'
//   },
//   atEnter: {
//     opacity: 0,
//     position: 'absolute'
//   },
//   atLeave: {
//     opacity: 0,
//     position: 'absolute'
//   }
// };

// export const renderRoute = (
//   route: GothamRouteData,
//   Flux: FluxFramework,
//   gothamConfig: GothamConfiguration
// ): ReactNode => {
//   const {authenticate = false, path, props: componentProps, ...restRouteProps} = route;
//   const viewProps: RouteViewProps = {Flux, authenticate, gothamConfig, ...restRouteProps, ...componentProps};

//   return (
//     <Route
//       key={path}
//       path={path}
//       element={<GothamRoute routeProps={route} viewProps={viewProps} />}
//       index={path === '/'}
//       {...restRouteProps}
//     />
//   );
// };

// export const getRoutes = (routes, Flux: FluxFramework, gothamConfig: GothamConfiguration) =>
//   routes.reduce((renderedRoutes: ReactNode[], route: GothamRouteData) => {
//     const {path, routes: nestedRoutes} = route;
//     let routeList = [...renderedRoutes];

//     // Only render routes that have a path and are not a custom error page.
//     if(!!path && isNaN(+(path))) {
//       routeList.push(renderRoute(route, Flux, gothamConfig));
//     }

//     if(nestedRoutes && nestedRoutes.length) {
//       routeList = routeList.concat(getRoutes(nestedRoutes, Flux, gothamConfig));
//     }

//     return routeList;
//   }, []);

// export const renderRouteList = (
//   routes: GothamRouteData[] = [],
//   Flux: FluxFramework,
//   gothamConfig: GothamConfiguration
// ): ReactNode[] => {
//   const {titleBarSeparator} = gothamConfig?.app || {};
//   const gothamRoutes: ReactNode[] = getRoutes(routes, Flux, gothamConfig);

//   // See if the user has provided a view for no matches
//   const notFound: GothamRouteData = routes.find((route: GothamRouteData) => route && route.path === '404');

//   // If not, load the default view
//   const notFoundRoute: GothamRouteData = {title: 'Page Not Found', ...notFound, view: 'notfound'};
//   const {title} = notFoundRoute;

//   GothamActions.updateTitle(title, titleBarSeparator);

//   const render404 = <Route
//     key="notFound"
//     element={<GothamRoute routeProps={notFoundRoute} viewProps={{title} as RouteViewProps} />}
//   />;

//   return [...gothamRoutes, render404];
// };

// export const renderSwitch = (
//   routes: GothamRouteData[] = [],
//   Flux: FluxFramework,
//   gothamConfig: GothamConfiguration
// ): ReactNode =>
//   <Routes>{renderRouteList(routes, Flux, gothamConfig)}</Routes>;

// Define a type for our custom route objects
export type CustomRouteProps = RouteObject & {
  readonly authenticate?: boolean;
  readonly props?: Record<string, unknown>;
  readonly routes?: CustomRouteProps[];
}

export const parseRoutes = (routes: CustomRouteProps[] = []): RouteObject[] => {
  return routes.map(route => {
    const {
      authenticate,
      element,
      props,
      routes: nestedRoutes,
      ...standardRouteProps
    } = route;

    let routeElement = element;

    console.log({authenticate});
    if (authenticate) {
      routeElement = <AuthRoute>{element}</AuthRoute>;
    }

    if (nestedRoutes?.length) {
      return {
        ...standardRouteProps,
        children: parseRoutes(nestedRoutes),
        element: routeElement
      } as RouteObject;
    }

    return {
      ...standardRouteProps,
      element: routeElement
    } as RouteObject;
  });
};

