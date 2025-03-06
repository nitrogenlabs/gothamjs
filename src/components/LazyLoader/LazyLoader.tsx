/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {lazy, Suspense, useMemo} from 'react';

export const LazyLoad = ({
  component,
  props,
  loader: Loader,
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
