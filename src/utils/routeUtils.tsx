/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {FluxFramework} from '@nlabs/arkhamjs';
import {ReactNode, useEffect} from 'react';
import {Navigate, Route, RouteProps, Routes} from 'react-router';
import React from 'react';

import {AuthRoute} from '../components/AuthRoute/AuthRoute';
import {LazyLoad} from '../components/LazyLoader/LazyLoader';
import {Loader} from '../components/Loader/Loader';
import {lazyImport} from './dynamicUtils';
import {GothamActions} from '../actions/GothamActions';
import {MarkdownView} from '../views/MarkdownView/MarkdownView';
import {DefaultView} from '../views/DefaultView/DefaultView';
import {HomeView} from '../views/HomeView/HomeView';
import {type GothamConfiguration} from '../views/Gotham/GothamProvider';
import {GothamRouteProps} from '../components/GothamRouter/GothamRouter';

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

export const parseRoute = (route: GothamRouteProps, props: any): ReactNode => {
  const {
    authenticate,
    component,
    isAuth,
    path,
    view
  } = route;
  const viewProps: any = {loader: Loader, ...props};

  const RouteComponent = () => {
    useEffect(() => {
      const {title} = route;
      const {titleBarSeparator} = props.gothamConfig;
      GothamActions.updateTitle(title, titleBarSeparator);
    }, [route.title, props.gothamConfig.titleBarSeparator]);


    if(authenticate && !isAuth()) {
      return <Navigate to="/signin" />;
    }

    // Get component
    if(view) {
      // Built-in views
      switch(view) {
        case 'default':
          return <LazyLoad component={DefaultView} {...viewProps} />;
        case 'home':
          return <LazyLoad component={HomeView} {...viewProps} />;
        case 'markdown':
          return <LazyLoad component={MarkdownView} {...viewProps} />;
        case 'notfound':
          return <LazyLoad component={NotFoundView} {...viewProps} />;
        default:
          return null;
      }
    } else if(component) {
      console.log('component', {component: component()});
      // Create an async imported component
      return <LazyLoad component={component} {...viewProps} />;
    }

    throw new Error(`Gotham Error: Route "${path}" is missing "component" property.`);
  };

  return <RouteComponent />;
};

export const renderRoute = (
  route: GothamRouteProps,
  Flux: FluxFramework,
  gothamConfig: GothamConfiguration
): ReactNode => {
  const {isAuth: defaultIsAuth} = gothamConfig;
  const {authenticate = false, isAuth = defaultIsAuth, path, ...restRouteProps} = route;
  // const ReactRoute = authenticate ? AuthRoute : Route;
  const {props: componentProps, ...routeProps} = route;
  const viewProps: any = {gothamConfig, Flux, ...routeProps, ...componentProps};

  return (
    <Route
      key={path}
      path={path}
      element={parseRoute(route, viewProps)}
      index={path === '/'}
      {...restRouteProps}
    />
  );
};

export const getRoutes = (routes, Flux: FluxFramework, gothamConfig: GothamConfiguration) =>
  routes.reduce((renderedRoutes: ReactNode[], route: GothamRouteProps) => {
    const {path, routes: nestedRoutes} = route;
    let routeList = [...renderedRoutes];

    // Only render routes that have a path and are not a custom error page.
    if(!!path && isNaN(+(path))) {
      routeList.push(renderRoute(route, Flux, gothamConfig));
    }

    if(nestedRoutes && nestedRoutes.length) {
      routeList = routeList.concat(getRoutes(nestedRoutes, Flux, gothamConfig));
    }

    return routeList;
  }, []);

export const renderRouteList = (
  routes: GothamRouteProps[] = [],
  Flux: FluxFramework,
  gothamConfig: GothamConfiguration
): ReactNode[] => {
  const {titleBarSeparator} = gothamConfig;
  const gothamRoutes: ReactNode[] = getRoutes(routes, Flux, gothamConfig);

  // See if the user has provided a view for no matches
  const notFound: GothamRouteProps = routes.find((route: GothamRouteProps) => route && route.path === '404');

  // If not, load the default view
  const notFoundRoute: GothamRouteProps = {title: 'Page Not Found', ...notFound, view: 'notfound'};
  const {title} = notFoundRoute;

  GothamActions.updateTitle(title, titleBarSeparator);

  const render404 = <Route
    key="notFound"
    element={parseRoute(notFoundRoute, {title}) as any}
  />;

  return [...gothamRoutes, render404];
};

export const renderSwitch = (
  routes: GothamRouteProps[] = [],
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
