// /**
//  * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
//  * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
//  */
// import {FluxFramework} from '@nlabs/arkhamjs';
// import {useFluxListener} from '@nlabs/arkhamjs-utils-react';
// import {BrowserRouter, Routes, useNavigate} from 'react-router';

// import {GothamConstants} from '../../constants/GothamConstants';
// import {GothamConfiguration} from '../../views/Gotham/GothamProvider';

// import type {GothamRouteData} from '../../types/gotham';
// import type {FC} from 'react';

// export const navBack = (history) => (): void => {
//   history.goBack();
// };

// export const navForward = (history) => (): void => {
//   history.goForward();
// };

// export const navGoto = (navigate) => (data): void => {
//   const {params, path = ''} = data;
//   navigate(path, params);
// };

// export const navReplace = (history) => (data): void => {
//   const {params, path = ''} = data;
//   history.replace(path, params);
// };

// export const GothamRouteListeners: FC = (): null => {
//   const navigate = useNavigate();

//   useFluxListener(GothamConstants.NAV_BACK, navBack(navigate));
//   useFluxListener(GothamConstants.NAV_FORWARD, navForward(navigate));
//   useFluxListener(GothamConstants.NAV_GOTO, navGoto(navigate));
//   useFluxListener(GothamConstants.NAV_REPLACE, navReplace(navigate));

//   return null;
// };

// export type GothamRoutesProps = {
//   readonly flux: FluxFramework;
//   readonly gothamConfig: GothamConfiguration;
//   readonly routes: GothamRouteData[];
// };

// export const GothamRoutes: FC<GothamRoutesProps> = ({
//   flux,
//   gothamConfig,
//   routes
// }) => (
//   <BrowserRouter>
//     <GothamRouteListeners />
//     <Routes>
//       {renderRouteList(routes, flux, gothamConfig)}
//     </Routes>
//   </BrowserRouter>
// );