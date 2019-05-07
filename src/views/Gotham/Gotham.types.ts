/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {FluxFramework, FluxMiddlewareType, FluxOptions} from '@nlabs/arkhamjs';
import {Location} from 'history';

export interface GothamProps {
  readonly classes?: any;
  readonly config?: GothamConfiguration;
  readonly isAuth?: boolean;
}

export interface GothamState {
  readonly currentNotification: GothamNotification;
  readonly hasNotification: boolean;
  readonly isAppLoaded: boolean;
  readonly isLoading: boolean;
}

export interface GothamRoute {
  readonly authenticate?: boolean;
  readonly asyncComponent?: any;
  readonly component?: any;
  readonly container?: 'default' | 'menu';
  readonly exact?: boolean;
  readonly isAuth?: boolean;
  readonly location?: Location;
  readonly name?: string;
  readonly path: string;
  readonly props?: any;
  readonly routes?: GothamRoute[];
  readonly sensitive?: boolean;
  readonly strict?: boolean;
  readonly title?: string;
  readonly view?: 'confirm' | 'home' | 'login' | 'markdown' | 'notfound';
}

export interface GothamButtonItem {
  readonly label?: string;
  readonly url?: string;
}

export interface GothamConfiguration {
  readonly baseUrl?: string;
  readonly config?: FluxOptions;
  readonly Flux?: FluxFramework;
  readonly isAuth?: () => boolean;
  readonly name?: string;
  readonly onInit?: () => any;
  readonly routes?: GothamRoute[];
  readonly storageType?: 'local' | 'session';
  readonly stores?: any[];
  readonly title?: string;
  readonly titleBarSeparator?: string;
  readonly theme?: any;
  readonly middleware?: FluxMiddlewareType[];
}

export interface GothamMenuItem {
  readonly content?: (color: string) => JSX.Element;
  readonly label?: string;
  readonly url: string;
  readonly menu?: GothamMenuItem[];
}

export type GothamPosition = 't' | 'tc' | 'tl' | 'tr' | 'b' | 'bc' | 'br' | 'bl';
export type GothamStatus = 'default' | 'error' | 'info' | 'success' | 'warning' | number;

export interface GothamNotification {
  readonly key: string;
  readonly message: string;
  readonly status: GothamStatus;
}

export interface GothamProviderProps {
  Flux: FluxFramework;
  children?: any;
}
