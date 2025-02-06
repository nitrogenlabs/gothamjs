/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {ComponentType, Suspense, lazy} from 'react';

import {Loader} from '../components/Loader/Loader';

export const lazyImport = <T extends ComponentType<any>, I extends {[K2 in K]: T}, K extends keyof I>(
  factory: () => Promise<I>,
  name: K
): I => Object.create({[name]: lazy(() => factory().then((module) => ({default: module[name]})))});

export const loadRemoteComponent = (url: string, exportName: string = 'default') => {
  const {[exportName]: Component} = lazyImport(() => import(url), exportName);

  return (props: any) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );
};