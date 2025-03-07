/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {lazy, Suspense, useMemo} from 'react';

import type {Loader} from '../Loader/Loader';

export interface RouteViewProps {
  component: () => Promise<{default: React.ComponentType<Record<string, unknown>>}>;
  loader?: typeof Loader;
  props?: Record<string, unknown>;
}

export const LazyLoad = ({
  component,
  loader: Loader,
  props
}) => {
  const LoadComponent = useMemo(() => {
    if(component) {
      return lazy(() => component());
    }

    return null;
  }, [component]);

  return (
    <Suspense fallback={Loader ? <Loader /> : null}>
      <LoadComponent {...props} />
    </Suspense>
  );
};
