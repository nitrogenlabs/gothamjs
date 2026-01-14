/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {Navigate, useLocation} from 'react-router';

import {Config} from '../../config/appConfig.js';

export const AuthRoute = ({ children }) => {
  const location = useLocation();
  const isAuth = Config.get('isAuth', () => false) as () => boolean;
  const authRoute = Config.get('authRoute', '/') as string;

  if (isAuth && isAuth()) {
    return children;
  }

  const redirect = encodeURIComponent(`${location.pathname}${location.search}${location.hash}`);
  return <Navigate to={`${authRoute}?redirect=${redirect}`} replace />;
};