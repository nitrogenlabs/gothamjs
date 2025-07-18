/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {Navigate, useLocation} from 'react-router';

import {Config} from '../../config/appConfig.js';

export const AuthRoute = ({ children }) => {
  const location = useLocation();
  const isAuth = Config.get('isAuth', () => false) as () => boolean;

  console.log({isAuth: isAuth && isAuth()});
  return isAuth && isAuth()
    ? children
    : <Navigate to={`/signIn?redirect=${location.pathname}${location.search}`} replace />;
};