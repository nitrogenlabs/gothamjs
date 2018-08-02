import {Location} from 'history';
import loadable from 'loadable-components';
import isEmpty from 'lodash/isEmpty';
import React from 'react';
import {RouteProps} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import {AnimatedSwitch, spring} from 'react-router-transition';

import {AppActions} from '../actions/AppActions';
import {Loader} from '../components/Loader';
import {DefaultContainer} from '../containers/DefaultContainer';
import {MenuContainer} from '../containers/MenuContainer';
import {GothamRouteType} from '../types/routes';

export const createAsyncComponent = (component) => loadable(component, {LoadingComponent: Loader});
export const parseRoute = (route: GothamRouteType) => {
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
    // Built-in containers
    switch(view) {
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

export const renderRoute = (route: GothamRouteType = {}): JSX.Element => {
  const LoadComponent = parseRoute(route);
  const {exact = true, container, path, strict, location, sensitive} = route;

  return (
    <Route
      exact={isEmpty(container) && exact}
      key={path}
      location={location}
      path={path}
      render={(props: RouteProps) => {
        const {props: componentProps, title, ...routeProps} = route;
        AppActions.updateTitle(title);
        return <LoadComponent title={title} {...props} {...routeProps} {...componentProps} />;
      }}
      sensitive={sensitive}
      strict={strict} />
  );
};

export const renderRoutes = (routes: GothamRouteType[] = []): JSX.Element[] => {
  const gothamRoutes: JSX.Element[] = routes.reduce((renderedRoutes: JSX.Element[], route: GothamRouteType) => {
    const {path} = route;

    // Only render routes that have a path and are not a custom error page.
    if(!isEmpty(path) && isNaN(+(path))) {
      renderedRoutes.push(renderRoute(route));
    }

    return renderedRoutes;
  }, []);

  // See if the user has provided a view for no matches
  const notFound: GothamRouteType = routes.find((route: GothamRouteType = {}) => route.path === '404') || {};

  // If not, load the default view
  const notFoundRoute: GothamRouteType = {title: 'Not Found', ...notFound, view: 'notfound'};
  const LoadComponent = parseRoute(notFoundRoute);
  const render404: JSX.Element = (
    <Route
      key="notFound"
      render={(props: RouteProps) => {
        const {title} = notFoundRoute;
        AppActions.updateTitle(title);
        return <LoadComponent title={title} {...props} />;
      }} />
  );

  gothamRoutes.push(render404);
  return gothamRoutes;
};

export const renderSwitch = (routes: GothamRouteType[] = [], siteTitle: string, location: Location): JSX.Element =>
  <Switch location={location}>{renderRoutes(routes)}</Switch>;

// View Transition
const bounce = (val) => spring(val, {
  damping: 24,
  stiffness: 500
});

const mapStyles = (styles) => ({
  opacity: styles.opacity,
  transform: `scale(${styles.scale}) translate(0px, ${styles.translateY}px)`
});

const bounceTransition = {
  atActive: {
    opacity: bounce(1),
    scale: bounce(1),
    translateY: bounce(0)
  },
  atEnter: {
    opacity: 0,
    scale: 1.05,
    translateY: -20
  },
  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.8),
    translateY: bounce(30)
  }
};

export const renderTransition = (routes: GothamRouteType[] = []): JSX.Element =>
  (
    <AnimatedSwitch
      atEnter={bounceTransition.atEnter}
      atLeave={bounceTransition.atLeave}
      atActive={bounceTransition.atActive}
      mapStyles={mapStyles}
      className="routeWrapper">
      {renderRoutes(routes)}
    </AnimatedSwitch>
  );

