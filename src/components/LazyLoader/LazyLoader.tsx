/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {lazy, Suspense} from 'react';

import type {Loader} from '../Loader/Loader.js';
import type {FC} from 'react';

export interface LazyLoadProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any;
  loader?: typeof Loader;
  props?: Record<string, unknown>;
}

export const LazyLoad: FC<LazyLoadProps> = ({
  component,
  loader: Loader,
  props
}) => {
  // const LoadComponent = useMemo(() => {
  //   if(component) {
  //     return lazy(() => component());
  //   }

  //   return null;
  // }, [component]);
  const LoadComponent = lazy(() => component());

  return (
    <Suspense fallback={Loader ? <Loader /> : null}>
      <LoadComponent {...props} />
    </Suspense>
  );
};
