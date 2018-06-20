import React from 'react';
import loadable from 'react-loadable';
import {Route} from 'react-router-dom';

import {GothamRouteType} from '../../types/routes';
import {DefaultContainer} from '../DefaultContainer/DefaultContainer';
import {Loader} from '../Loader/Loader';
import {MenuContainer} from '../MenuContainer/MenuContainer';

export const GothamRoute = (route: GothamRouteType) => {
  const {asyncComponent, component: Component, isContainer, exact = true, menu, path, ...config} = route;
  const updateTitle = (title: string, siteTitle: string) => {
    if(siteTitle === '' || siteTitle === title) {
      document.title = `${title}`;
    } else {
      document.title = `${title} :: ${siteTitle}`;
    }
  };

  // Get component
  let ViewComponent;

  if(isContainer) {
    if(menu && menu.length) {
      ViewComponent = MenuContainer;
    } else {
      ViewComponent = DefaultContainer;
    }
  } else if(Component) {
    ViewComponent = Component;
  } else if(asyncComponent) {
    const {component, name, ...asyncProps} = asyncComponent;
    ViewComponent = loadable({
      delay: 300,
      loader: component,
      loading: Loader,
      ...asyncProps,
      render(loaded, props) {
        const Component = loaded[name];
        return <Component {...props} />;
      }
    });
  } else {
    throw new Error(`Gotham Error: Route "${path}" is missing "component" property.`);
  }

  return (
    <Route path={path} exact={!isContainer && exact} render={(props) => {
      const {siteTitle, title} = config;
      updateTitle(title, siteTitle);
      return <ViewComponent {...props} path={path} {...config} />;
    }} />
  );
};
