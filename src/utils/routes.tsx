import loadable from 'loadable-components';
import React from 'react';
import {Route, RouteProps} from 'react-router-dom';

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
  console.log('route', route);
  if(isContainer) {
    // Built-in containers
    if(menu && menu.length) {
      return MenuContainer;
    }

    return DefaultContainer;
  } else if(asyncComponent) {
    // Create an async imported component
    console.log('asyncComponent', asyncComponent);
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
          console.log('render::title', title);
          console.log('render::LoadComponent', LoadComponent);
          updateTitle(title, siteTitle);
          return <LoadComponent {...props} {...route} />;
        }}
        sensitive={sensitive}
        strict={strict} />
    );
  });

