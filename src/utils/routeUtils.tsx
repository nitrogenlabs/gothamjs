/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {FluxFramework} from '@nlabs/arkhamjs';
import isEmpty from 'lodash/isEmpty';
import React from 'react';
import {Redirect, Route, RouteProps, Switch} from 'react-router-dom';

import {GothamActions} from '../actions/GothamActions';
import {LazyLoad} from '../components/LazyLoader';
import {Loader} from '../components/Loader';
import {DefaultContainer} from '../containers/DefaultContainer';
import {MenuContainer} from '../containers/MenuContainer';
import {GothamConfiguration, GothamRoute} from '../views/Gotham';
import {lazyImport} from './lazyImport';


const {NotFoundView} = lazyImport(() => import('../views/NotFoundView'), 'NotFoundView');
const {ConfirmView} = lazyImport(() => import('../views/ConfirmView'), 'ConfirmView');
const {HomeView} = lazyImport(() => import('../views/HomeView'), 'HomeView');
const {SignInView} = lazyImport(() => import('../views/SignInView'), 'SignInView');
const {MarkdownView} = lazyImport(() => import('../views/MarkdownView'), 'MarkdownView');

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

export const parseRoute = (route: GothamRoute, props: any) => {
  const {asyncComponent, component: Component, container, path, view} = route;
  const viewProps: any = {loader: Loader, ...props};

  // Get component
  if(!isEmpty(container)) {
    // Built-in containers
    switch(container) {
      case 'menu':
        return <MenuContainer {...viewProps} />;
      default:
        return <DefaultContainer {...viewProps} />;
    }
  } else if(!isEmpty(view)) {
    // Built-in views
    switch(view) {
      case 'confirm':
        return <LazyLoad component={ConfirmView} {...viewProps} />;
      case 'home':
        return <LazyLoad component={HomeView} {...viewProps} />;
      case 'markdown':
        return <LazyLoad component={MarkdownView} {...viewProps} />;
      case 'notfound':
        return <LazyLoad component={NotFoundView} {...viewProps} />;
      case 'signIn':
        return <LazyLoad component={SignInView} {...viewProps} />;
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

export const AuthRoute = (props) => (
  <Route
    {...props}
    render={() => {
      const {isAuth, render: ViewRoute, ...routeProps} = props;
      return (isAuth() ? <ViewRoute {...routeProps} />
        : <Redirect to={`/signIn?redirect=${props.location.pathname}${props.location.search}`} />);
    }} />
);

export const renderRoute = (
  route: GothamRoute,
  Flux: FluxFramework,
  gothamConfig: GothamConfiguration
): JSX.Element => {
  const {authenticate = false, exact = true, location, path, strict, sensitive} = route;
  const {isAuth, titleBarSeparator} = gothamConfig;
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
  routes.reduce((renderedRoutes: JSX.Element[], route: GothamRoute) => {
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
): JSX.Element[] => {
  const {titleBarSeparator} = gothamConfig;
  const gothamRoutes: JSX.Element[] = getRoutes(routes, Flux, gothamConfig);

  // See if the user has provided a view for no matches
  const notFound: GothamRoute = routes.find((route: GothamRoute) => route && route.path === '404');

  // If not, load the default view
  const notFoundRoute: GothamRoute = {title: 'Page Not Found', ...notFound, view: 'notfound'};
  const render404: JSX.Element = (
    <Route
      key="notFound"
      render={(props: RouteProps) => {
        const {title} = notFoundRoute;

        // Update browser title
        GothamActions.updateTitle(title, titleBarSeparator);

        // Dynamic aysnc view
        return parseRoute(notFoundRoute, {title, ...props});
      }} />
  );

  gothamRoutes.push(render404);
  return gothamRoutes;
};

export const renderSwitch = (
  routes: GothamRoute[] = [],
  Flux: FluxFramework,
  gothamConfig: GothamConfiguration
): JSX.Element =>
  <Switch>{renderRouteList(routes, Flux, gothamConfig)}</Switch>;

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
): JSX.Element => <Switch>{renderRouteList(routes, Flux, gothamConfig)}</Switch>;
