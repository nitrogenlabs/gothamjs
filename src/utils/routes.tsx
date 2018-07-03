import {Location} from 'history';
import loadable from 'loadable-components';
import React from 'react';
import {RouteProps} from 'react-router-dom';
import Route from 'react-router-dom/es/Route';
import Switch from 'react-router-dom/es/Switch';
import {AnimatedSwitch, spring} from 'react-router-transition';

import {DefaultContainer} from '../components/DefaultContainer/DefaultContainer';
import {Loader} from '../components/Loader/Loader';
import {MenuContainer} from '../components/MenuContainer/MenuContainer';
import {GothamRouteType} from '../types/routes';

const updateTitle = (title: string = '', siteTitle: string = '') => {
  if(title !== '' && siteTitle === title) {
    document.title = `${title} :: ${siteTitle}`;
  } else {
    document.title = `${siteTitle}`;
  }
};

export const parseRoute = (route: GothamRouteType) => {
  const {asyncComponent, component, isContainer, menu, path} = route;

  // Get component
  if(isContainer) {
    // Built-in containers
    if(menu && menu.length) {
      return MenuContainer;
    }

    return DefaultContainer;
  } else if(asyncComponent) {
    // Create an async imported component
    return loadable(asyncComponent, {LoadingComponent: Loader});
  } else if(component) {
    // Custom components
    return component;
  }

  throw new Error(`Gotham Error: Route "${path}" is missing "component" property.`);
};

export const renderRoutes = (routes: GothamRouteType[] = [], siteTitle: string): JSX.Element[] =>
  routes.map((route: GothamRouteType) => {
    const LoadComponent = parseRoute(route);
    const {exact = true, isContainer, path, strict, location, sensitive} = route;

    return (
      <Route
        exact={!isContainer && exact}
        key={path}
        location={location}
        path={path}
        render={(props: RouteProps) => {
          const {title} = route;
          updateTitle(title, siteTitle);
          return <LoadComponent {...props} {...route} />;
        }}
        sensitive={sensitive}
        strict={strict} />
    );
  });

export const renderSwitch = (routes: GothamRouteType[] = [], siteTitle: string, location: Location): JSX.Element =>
  <Switch location={location}>{renderRoutes(routes, siteTitle)}</Switch>;

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

export const renderTransition = (routes: GothamRouteType[] = [], siteTitle: string): JSX.Element =>
  (
    <AnimatedSwitch
      atEnter={bounceTransition.atEnter}
      atLeave={bounceTransition.atLeave}
      atActive={bounceTransition.atActive}
      mapStyles={mapStyles}
      className="routeWrapper">
      {renderRoutes(routes, siteTitle)}
    </AnimatedSwitch>
  );

