/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import qs from 'qs';
import {useMemo} from 'react';
import {Location, Navigation, useLocation, useNavigation, useParams, useMatches} from 'react-router';

export interface AppRouter {
  readonly location: Location;
  readonly matches: unknown[];
  readonly navigation: Navigation;
  readonly params: unknown;
}

export const useRoute = (): AppRouter => {
  const navigation = useNavigation();
  const location = useLocation() || {} as unknown as Location;
  const urlParams = useParams();
  const matches = useMatches();

  return useMemo(() => ({
    location,
    matches,
    navigation,
    params: {
      ...(location.state || {}),
      ...urlParams,
      ...qs.parse(location.search, {ignoreQueryPrefix: true})
    }
  }), [navigation, location, matches, urlParams]);
};

export const parseNavUrl = (path: string, params: Record<string, unknown>): string => path
  .split('/')
  .reduce((list: string[], part: string) => {
    if(part.substr(0, 1) === ':') {
      const value: unknown = params[part.substr(1)];
      return [...list, (value !== undefined) ? value : part];
    }

    return [...list, part];
  }, []).join('/');
