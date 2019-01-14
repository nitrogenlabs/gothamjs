import loadable from '@loadable/component';
import {FluxFramework} from '@nlabs/arkhamjs/lib';
import isEmpty from 'lodash/isEmpty';
import React from 'react';
import {RouteProps} from 'react-router-dom';
import Redirect from 'react-router-dom/Redirect';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import {GothamActions} from '../actions/GothamActions';
import {Loader} from '../components/Loader';
import {DefaultContainer} from '../containers/DefaultContainer';
import {MenuContainer} from '../containers/MenuContainer';
import {GothamConfiguration, GothamRoute} from '../types/gotham';

/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
// import {AnimatedRoute} from 'react-router-transition';

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
export const createAsyncComponent = (component) => loadable(component, {LoadingComponent: Loader});
export const parseRoute = (route: GothamRoute) => {
  const {asyncComponent, component, container, path, view} = route;

  // Get component
  if(!isEmpty(container)) {
    // Built-in containers
    switch(container) {
      case 'menu':
        return MenuContainer;
      default:
        return DefaultContainer;
    }
  } else if(!isEmpty(view)) {
    // Built-in views
    switch(view) {
      case 'confirm':
        return createAsyncComponent(() => import('../views/ConfirmView'));
      case 'home':
        return createAsyncComponent(() => import('../views/HomeView'));
      case 'login':
        return createAsyncComponent(() => import('../views/LoginView'));
      case 'markdown':
        return createAsyncComponent(() => import('../views/MarkdownView'));
      case 'notfound':
        return createAsyncComponent(() => import('../views/NotFoundView'));
      default:
        return null;
    }
  } else if(asyncComponent) {
    // Create an async imported component
    return createAsyncComponent(asyncComponent);
  } else if(component) {
    // Custom components
    return component;
  }

  throw new Error(`Gotham Error: Route "${path}" is missing "component" property.`);
};

export const AuthRoute = (props) => (
  <Route
    {...props}
    render={() => {
      const {authentication} = props;
      return ((authentication && authentication()) ? <props.render exact={props.exact} />
        : <Redirect to={`/login?redirect=${props.location.pathname}${props.location.search}`} />);
    }} />
);

export const renderRoute = (
  route: GothamRoute,
  Flux: FluxFramework,
  gothamConfig: GothamConfiguration
): JSX.Element => {
  const LoadComponent = parseRoute(route);
  const {authenticate = false, exact = true, path, strict, location, sensitive} = route;
  const {authentication, titleBarSeparator} = gothamConfig;
  const ReactRoute = authenticate ? AuthRoute : Route;

  return (
    <ReactRoute
      {...fadeTransition}
      authentication={authentication}
      exact={exact}
      key={path}
      location={location}
      path={path}
      render={(props: RouteProps) => {
        const {props: componentProps, title, ...routeProps} = route;
        GothamActions.updateTitle(title, titleBarSeparator);
        return (
          <LoadComponent
            gothamConfig={gothamConfig}
            Flux={Flux}
            title={title}
            {...props}
            {...routeProps}
            {...componentProps} />
        );
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
  const LoadComponent = parseRoute(notFoundRoute);
  const render404: JSX.Element = (
    <Route
      key="notFound"
      render={(props: RouteProps) => {
        const {title} = notFoundRoute;
        GothamActions.updateTitle(title, titleBarSeparator);
        return <LoadComponent title={title} {...props} />;
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
  <Switch location={location}>{renderRouteList(routes, Flux, gothamConfig)}</Switch>;

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
): JSX.Element => <Switch className="routeWrapper">{renderRouteList(routes, Flux, gothamConfig)}</Switch>;
