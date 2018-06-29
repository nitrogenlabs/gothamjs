import loadable from 'loadable-components';
import React from 'react';

import {GothamRouteType} from '../../types/routes';
import {DefaultContainer} from '../DefaultContainer/DefaultContainer';
import {Loader} from '../Loader/Loader';
import {MenuContainer} from '../MenuContainer/MenuContainer';

export const GothamRoute = (route: GothamRouteType) => {
  const {asyncComponent, component, isContainer, exact = true, menu, path, ...config} = route;

  // Get component
  console.log('route', route);
  if(isContainer) {
    if(menu && menu.length) {
      return MenuContainer;
    }

    return DefaultContainer;


    // return (
    //   <Route path={path} exact={!isContainer && exact} render={(props) => {
    //     console.log('props', props);
    //     const {siteTitle, title} = config;
    //     updateTitle(title, siteTitle);
    //     return <ViewComponent {...props} path={path} {...config} />;
    //   }} />
    // );
  } else if(component) {
    return component;
  } else if(asyncComponent) {
    console.log('asyncComponent', asyncComponent);
    return () => loadable(asyncComponent, {
      LoadingComponent: Loader
      // render: ({Component, error, loading, ownProps}) => {
      //   console.log('Component', Component);
      //   console.log('error', error);
      //   console.log('loading', loading);
      //   console.log('ownProps', ownProps);
      //   return <Component {...ownProps} />;
      // }
    });
    // }
    //  else if(asyncComponent) {
    //   const {component, name, ...asyncProps} = asyncComponent;
    //   ViewComponent = loadable(() => component(), {
    //     LoadingComponent: Loader,
    //     render: ({Component, loading, ownProps}) => {
    //       console.log('Component', Component);
    //       console.log('loading', loading);
    //       console.log('ownProps', ownProps);
    //       return <Component {...ownProps} />;
    //     }
    //   });
    // {
    // delay: 300,
    // loader: component,
    // loading: Loader,
    // ...asyncProps,
    // render(loaded, props) {
    //   const Component = loaded[name];
    //   return <Component {...props} />;
    // }
    // }
    // );
  }
  throw new Error(`Gotham Error: Route "${path}" is missing "component" property.`);


  // console.log('ViewComponent', !isContainer && exact, ViewComponent);
  // console.log('path', path);
  // console.log('config', config);
  // return (
  //   <Route path={path} exact={!isContainer && exact} render={(props) => {
  //     console.log('render::props', props);
  //     return <ViewComponent path={path} {...props} {...config} />;
  //   }} />
  // );
};

export default GothamRoute;
// export default hot(module)(GothamRoute);
