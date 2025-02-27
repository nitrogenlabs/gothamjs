/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {useEffect} from 'react';

import {GothamProvider} from './GothamProvider';
import {LoaderView} from '../LoaderView/LoaderView';

import type {FC, ReactNode} from 'react';
import type {GothamConfiguration, GothamStatus} from './GothamProvider';

export interface GothamProps {
  readonly children?: ReactNode;
  readonly classes?: any;
  readonly config?: GothamConfiguration;
  readonly isAuth?: () => boolean;
}

export interface GothamState {
  readonly currentNotification: GothamNotification;
  readonly hasNotification: boolean;
  readonly isAppLoaded: boolean;
  readonly isLoading: boolean;
}

export interface GothamButtonItem {
  readonly label?: string;
  readonly url?: string;
}

export type GothamMenuType = 'header' | 'link';

export interface GothamMenuItem {
  readonly content?: (color: string) => ReactNode;
  readonly label?: string;
  readonly menu?: GothamMenuItem[];
  readonly path?: string;
  readonly type: GothamMenuType;
  readonly url: string;
}

export interface GothamNotification {
  readonly key: string;
  readonly message: string;
  readonly status: GothamStatus;
}

export interface ContainerProviderProps {
  children?: any;
  navProps: any;
  routeProps: any;
}

export const onKeyUp = (event) => {
  if(event.which === 9) {
    document.documentElement.classList.remove('noFocusOutline');
  }
};

export const Gotham: FC<GothamProps> = ({children, config = {}}) => {
  useEffect(() => {
    document.body.addEventListener('keyup', onKeyUp);
  }, []);

  return (
    <GothamProvider config={config}>
      {children}
      <LoaderView />
    </GothamProvider >
  );
};

export default Gotham;
