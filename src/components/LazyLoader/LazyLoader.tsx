/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import React, {lazy, Suspense} from 'react';

export const asyncLoader = (resolver, props) => {
  const {loader: Loader, ...restProps} = props;
  const LoadComponent = lazy(resolver);

  if(Loader) {
    return (
      <Suspense fallback={<Loader />}>
        <LoadComponent {...restProps} />
      </Suspense>
    );
  }

  return (
    <LoadComponent {...restProps} />
  );
};

export const LazyLoad = ({resolver, ...props}) => asyncLoader(resolver, props);
