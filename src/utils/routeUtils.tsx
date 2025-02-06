/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {FluxFramework} from '@nlabs/arkhamjs';
import {ReactNode} from 'react';
import isEmpty from 'lodash/isEmpty';
import {Route, RouteProps, Routes} from 'react-router-dom';
import {AuthRoute} from '../components/AuthRoute/AuthRoute';
import {LazyLoad} from '../components/LazyLoader/LazyLoader';
import {Loader} from '../components/Loader/Loader';
import {lazyImport} from './dynamicUtils';
import {GothamActions} from '../actions/GothamActions';
import {GothamConfiguration, GothamRoute} from '../views/Gotham/Gotham';
import {MarkdownView} from '../views/MarkdownView/MarkdownView';

const {NotFoundView} = lazyImport(() => import('../views/NotFoundView/NotFoundView'), 'NotFoundView');

export const fadeTransition = {
  atActive: {
    opacity: 1,
    position: 'relative'
  },
  atEnter: {
    opacity: 0,
    position: 'absolute'
  },
  atLeave: {
    opacity: 0,
    position: 'absolute'
  }
};

export const parseRoute = (route: GothamRoute, props: any): ReactNode => {
  const {asyncComponent, component: Component, container, path, view} = route;
  const viewProps: any = {loader: Loader, ...props};

  // Get component
  if(view) {
    // Built-in views
    switch(view) {
      case 'markdown':
        return <LazyLoad component={MarkdownView} {...viewProps} />;
      case 'notfound':
        return <LazyLoad component={NotFoundView} {...viewProps} />;
      default:
        return null;
    }
  } else if(asyncComponent) {
    // Create an async imported component
    return <LazyLoad component={asyncComponent} {...viewProps} />;
  } else if(Component) {
    // Custom components
    return <Component {...viewProps} />;
  }

  throw new Error(`Gotham Error: Route "${path}" is missing "component" property.`);
};

export const renderRoute = (
  route: GothamRoute,
  Flux: FluxFramework,
  gothamConfig: GothamConfiguration
): ReactNode => {
  const {isAuth: defaultIsAuth, titleBarSeparator} = gothamConfig;
  const {authenticate = false, exact = true, isAuth = defaultIsAuth, location, path, strict, sensitive} = route;
  const ReactRoute = authenticate ? AuthRoute : Route;

  return (
    <ReactRoute
      exact={exact}
      isAuth={isAuth}
      key={path}
      location={location}
      path={path}
      render={(props: RouteProps) => {
        const {props: componentProps, title, ...routeProps} = route;
        const viewProps: any = {gothamConfig, Flux, title, ...props, ...routeProps, ...componentProps};

        // Update browser title
        GothamActions.updateTitle(title, titleBarSeparator);

        // Dynamic async route view
        return parseRoute(route, viewProps);
      }}
      sensitive={sensitive}
      strict={strict} />
  );
};

export const getRoutes = (routes, Flux: FluxFramework, gothamConfig: GothamConfiguration) =>
  routes.reduce((renderedRoutes: ReactNode[], route: GothamRoute) => {
    const {path, routes: nestedRoutes} = route;
    let routeList = [...renderedRoutes];

    // Only render routes that have a path and are not a custom error page.
    if(!isEmpty(path) && isNaN(+(path))) {
      routeList.push(renderRoute(route, Flux, gothamConfig));
    }

    if(nestedRoutes && nestedRoutes.length) {
      routeList = routeList.concat(getRoutes(nestedRoutes, Flux, gothamConfig));
    }

    return routeList;
  }, []);

export const renderRouteList = (
  routes: GothamRoute[] = [],
  Flux: FluxFramework,
  gothamConfig: GothamConfiguration
): ReactNode[] => {
  const {titleBarSeparator} = gothamConfig;
  const gothamRoutes: ReactNode[] = getRoutes(routes, Flux, gothamConfig);

  // See if the user has provided a view for no matches
  const notFound: GothamRoute = routes.find((route: GothamRoute) => route && route.path === '404');

  // If not, load the default view
  const notFoundRoute: GothamRoute = {title: 'Page Not Found', ...notFound, view: 'notfound'};
  const {title} = notFoundRoute;
  GothamActions.updateTitle(title, titleBarSeparator);

  const render404 = <Route
    key="notFound"
    element={parseRoute(notFoundRoute, {title}) as any} />;

  gothamRoutes.push(render404);
  return gothamRoutes;
};

export const renderSwitch = (
  routes: GothamRoute[] = [],
  Flux: FluxFramework,
  gothamConfig: GothamConfiguration
): ReactNode =>
  <Routes>{renderRouteList(routes, Flux, gothamConfig)}</Routes>;

// View Transition
// const bounce = (val) => spring(val, {
//   damping: 24,
//   stiffness: 500
// });

// const mapStyles = (styles) => ({
//   opacity: styles.opacity,
//   transform: `scale(${styles.scale}) translate(0px, ${styles.translateY}px)`
// });

// const bounceTransition = {
//   atActive: {
//     opacity: bounce(1),
//     scale: bounce(1),
//     translateY: bounce(0)
//   },
//   atEnter: {
//     opacity: 0,
//     scale: 1.01,
//     translateY: -5
//   },
//   atLeave: {
//     opacity: bounce(0),
//     scale: bounce(0),
//     translateY: bounce(10)
//   }
// };

export const renderTransition = (
  routes: GothamRoute[] = [],
  Flux: FluxFramework,
  gothamConfig: GothamConfiguration
): ReactNode => <Routes>{renderRouteList(routes, Flux, gothamConfig)}</Routes>;
