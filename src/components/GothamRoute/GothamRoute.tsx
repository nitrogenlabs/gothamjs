


// import {useEffect, type FC} from 'react';
// import {Navigate} from 'react-router';

// import {LazyLoad} from '..';
// import {GothamActions} from '../../actions/GothamActions';
// import {DefaultView} from '../../views/DefaultView/DefaultView';
// import {HomeView} from '../../views/HomeView/HomeView';
// import {MarkdownView} from '../../views/MarkdownView/MarkdownView';
// import MenuView from '../../views/MenuView/MenuView';
// import {NotFoundView} from '../../views/NotFoundView/NotFoundView';
// import {Loader} from '../Loader/Loader';

// import type {GothamRouteData} from '../../types/gotham';
// import type {RouteViewProps} from '../../utils/routeUtils';

// export interface GothamRouteProps {
//   readonly routeProps: GothamRouteData;
//   readonly viewProps: RouteViewProps;
// }

// export const GothamRoute: FC<GothamRouteProps> = ({routeProps, viewProps}) => {
//   const {isAuth: defaultIsAuth} = viewProps.gothamConfig;
//   const {
//     authenticate = false,
//     component,
//     isAuth = defaultIsAuth,
//     path,
//     view
//   } = routeProps;
//   const updatedViewProps: RouteViewProps = {loader: Loader, ...viewProps};

//   useEffect(() => {
//     const {title} = routeProps;
//     const {app: {titleBarSeparator}} = viewProps.gothamConfig;
//     GothamActions.updateTitle(title, titleBarSeparator);
//   }, [routeProps.title, viewProps.gothamConfig?.app?.titleBarSeparator]);


//   if(authenticate && !isAuth()) {
//     return <Navigate to="/signin" />;
//   }

//   if(view) {
//     switch(view) {
//       case 'default':
//         return <LazyLoad component={DefaultView} {...updatedViewProps} />;
//       case 'home':
//         return <LazyLoad component={HomeView} {...updatedViewProps} />;
//       case 'markdown':
//         return <LazyLoad component={MarkdownView} {...updatedViewProps} />;
//       case 'menu':
//         return <LazyLoad component={MenuView} {...updatedViewProps} />;
//       case 'notfound':
//         return <LazyLoad component={NotFoundView} {...updatedViewProps} />;
//       default:
//         return null;
//     }
//   } else if(component) {
//     return <LazyLoad component={component} {...updatedViewProps} />;
//   }

//   throw new Error(`Gotham Error: Route "${path}" is missing "component" property.`);
// };