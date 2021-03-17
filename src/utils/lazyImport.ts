import {ComponentType, lazy} from 'react';

export const lazyImport = <T extends ComponentType<any>, I extends {[K2 in K]: T}, K extends keyof I>(
  factory: () => Promise<I>,
  name: K
): I => Object.create({[name]: lazy(() => factory().then((module) => ({default: module[name]})))});
