/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import qs from 'qs';
import {useMemo} from 'react';
import {useHistory, useLocation, useParams, useRouteMatch} from 'react-router-dom';

export interface AppRouter {
  readonly history: History;
  readonly location: Location;
  readonly match: any;
  readonly params: any;
}

export const useRoute = (): AppRouter => {
  const history = useHistory();
  const location = useLocation() || {};
  const urlParams = useParams();
  const match = useRouteMatch();

  return useMemo(() => ({
    history,
    location,
    match,
    params: {
      ...(location.state || {}),
      ...urlParams,
      ...qs.parse(location.search, {ignoreQueryPrefix: true})
    }
  }), [history, location, match, urlParams]);
};

export const parseNavUrl = (path: string, params: any): string => path
  .split('/')
  .reduce((list: string[], part: string) => {
    if(part.substr(0, 1) === ':') {
      const value: any = params[part.substr(1)];
      return [...list, (value !== undefined) ? value : part];
    }

    return [...list, part];
  }, []).join('/');
