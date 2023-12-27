/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import qs from 'qs';
import {useMemo} from 'react';
import {Location, Navigation, useLocation, useNavigation, useParams, useMatches} from 'react-router-dom';

export interface AppRouter {
  readonly navigation: Navigation;
  readonly location: Location;
  readonly matches: any;
  readonly params: any;
}

export const useRoute = (): AppRouter => {
  const navigation = useNavigation();
  const location = useLocation() || {} as unknown as Location;
  const urlParams = useParams();
  const matches = useMatches();

  return useMemo(() => ({
    navigation,
    location,
    matches,
    params: {
      ...(location.state || {}),
      ...urlParams,
      ...qs.parse(location.search, {ignoreQueryPrefix: true})
    }
  }), [navigation, location, matches, urlParams]);
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
