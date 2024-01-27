/**
 * Copyright (c) 2024-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {Flux, FluxFramework, FluxMiddlewareType, FluxOptions} from '@nlabs/arkhamjs';
import {Logger, LoggerDebugLevel} from '@nlabs/arkhamjs-middleware-logger';
import {BrowserStorage} from '@nlabs/arkhamjs-storage-browser';
import {Location} from 'history';
import {FC, ReactNode, useEffect} from 'react';
import {I18nextProvider} from 'react-i18next';

import {GothamActions} from '../../actions/GothamActions';
import {GlobalStyles} from '../../components';
import {GothamRoute} from '../../components/GothamRouter/GothamRouter';
import {Notify} from '../../components/Notify/Notify';
import {Config} from '../../config/app';
import {gothamApp} from '../../stores/gothamAppStore';
import {GothamContext} from '../../utils/GothamProvider';
import {i18n} from '../../utils/i18nUtil';
import {LoaderView} from '../LoaderView';

export interface GothamProps {
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

export interface GothamRoute {
  readonly authenticate?: boolean;
  readonly asyncComponent?: any;
  readonly component?: any;
  readonly container?: 'default' | 'menu';
  readonly exact?: boolean;
  readonly isAuth?: () => boolean;
  readonly location?: Location;
  readonly name?: string;
  readonly path: string;
  readonly props?: any;
  readonly routes?: GothamRoute[];
  readonly sensitive?: boolean;
  readonly strict?: boolean;
  readonly title?: string;
  readonly view?: 'confirm' | 'home' | 'markdown' | 'signIn' | 'notfound';
}

export interface GothamButtonItem {
  readonly label?: string;
  readonly url?: string;
}

export type ThemeDisplayMode = 'auto' | 'dark' | 'light';

export interface GothamConfiguration {
  readonly baseUrl?: string;
  readonly config?: FluxOptions;
  readonly displayMode?: ThemeDisplayMode;
  readonly flux?: FluxFramework;
  readonly isAuth?: () => boolean;
  readonly middleware?: FluxMiddlewareType[];
  readonly name?: string;
  readonly onInit?: () => any;
  readonly routes?: GothamRoute[];
  readonly storageType?: 'local' | 'session';
  readonly stores?: any[];
  readonly title?: string;
  readonly titleBarSeparator?: string;
  readonly theme?: any;
  readonly translations?: any;
}

export type GothamSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type GothamMenuType = 'header' | 'link';

export interface GothamMenuItem {
  readonly content?: (color: string) => JSX.Element;
  readonly label?: string;
  readonly menu?: GothamMenuItem[];
  readonly path?: string;
  readonly type: GothamMenuType;
  readonly url: string;
}

export type GothamPosition = 't' | 'tc' | 'tl' | 'tr' | 'b' | 'bc' | 'br' | 'bl';
export type GothamStatus = 'default' | 'error' | 'info' | 'success' | 'warning' | number;

export interface GothamNotification {
  readonly key: string;
  readonly message: string;
  readonly status: GothamStatus;
}

export interface GothamProviderProps {
  readonly children?: ReactNode;
  readonly config: any;
}

export const GothamProvider: FC<GothamProviderProps> = ({children, config}) => {
  useEffect(() => {
    if(Flux) {
      // ArkhamJS Middleware
      const env: string = Config.get('environment');
      const logger: Logger = new Logger({
        debugLevel: env === 'development' ? LoggerDebugLevel.DISPATCH : LoggerDebugLevel.DISABLED
      });

      // ArkhamJS Configuration
      const storage: BrowserStorage = new BrowserStorage({type: storageType});

      Flux.init({
        middleware: [logger, ...middleware],
        name,
        // state: {app: {title}},
        storage,
        stores: [gothamApp, ...stores]
      });
    }
  }, []);

  const {isAuth} = config;

  const cache = createCache({
    key: 'css',
    prepend: true
  });

  return (
    <I18nextProvider i18n={i18n(translations)}>
      <GothamContext.Provider value={{Flux, isAuth, session}}>
        <GlobalStyles />
        {children}
        <LoaderView />
        <Notify />
      </GothamContext.Provider>
    </I18nextProvider>
  );
};