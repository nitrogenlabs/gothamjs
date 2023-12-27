/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import React from 'react';
import {Navigate, Route} from 'react-router-dom';

export const AuthRoute = (props) => (
  <Route
    {...props}
    render={() => {
      const {isAuth, render: ViewRoute, ...routeProps} = props;

      return (isAuth && isAuth() ? <ViewRoute {...routeProps} />
        : <Navigate to={`/signIn?redirect=${props.location.pathname}${props.location.search}`} />);
    }} />
);
