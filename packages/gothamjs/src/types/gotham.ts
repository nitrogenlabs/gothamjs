/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {WithStyles} from '@material-ui/core/styles';
import {FluxFramework, FluxMiddlewareType, FluxOptions, Store} from '@nlabs/arkhamjs';
import {Location} from 'history';

export interface GothamProps extends WithStyles<any> {
  readonly config?: GothamConfiguration;
}

export interface GothamState {
  readonly isLoaded: boolean;
}

export interface GothamRoute {
  readonly asyncComponent?: any;
  readonly component?: any;
  readonly container?: 'default' | 'menu';
  readonly exact?: boolean;
  readonly location?: Location;
  readonly name?: string;
  readonly path: string;
  readonly props: any;
  readonly routes?: GothamRoute[];
  readonly sensitive?: boolean;
  readonly strict?: boolean;
  readonly title?: string;
  readonly view?: 'home' | 'login' | 'markdown' | 'notfound';
}

export interface GothamAppProps {
  readonly titleBarSeparator?: string;
}

export interface GothamButtonItem {
  readonly label?: string;
  readonly url?: string;
}

export interface GothamConfiguration {
  readonly base?: GothamAppProps;
  readonly config?: FluxOptions;
  readonly name?: string;
  readonly routes?: GothamRoute[];
  readonly stores?: Store[];
  readonly title?: string;
  readonly middleware?: FluxMiddlewareType[];
}

export interface GothamMenuItem {
  readonly label?: string;
  readonly url: string;
  readonly menu?: GothamMenuItem[];
}

export interface GothamProviderProps {
  Flux: FluxFramework;
  children?: any;
}
