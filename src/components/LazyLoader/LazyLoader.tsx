/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {Suspense, useMemo} from 'react';

export const asyncLoader = (component, props) => {
  const {loader: Loader, ...restProps} = props;
  const LoadComponent = useMemo(() => component, [component]);

  return (
    <Suspense fallback={Loader ? <Loader /> : null}>
      <LoadComponent {...restProps} />
    </Suspense>
  );
};

export const LazyLoad = ({component, ...props}) => asyncLoader(component, props);
