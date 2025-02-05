/**
 * Copyright (c) 2024-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import '../../css/fonts.css';
import '../../css/styles.css';
import {Flux} from '@nlabs/arkhamjs';
import {Logger, LoggerDebugLevel} from '@nlabs/arkhamjs-middleware-logger';
import {BrowserStorage} from '@nlabs/arkhamjs-storage-browser';
import {FC, ReactNode, useEffect} from 'react';
import {I18nextProvider} from 'react-i18next';

import {Config} from '../../config/app';
import {gothamApp} from '../../stores/gothamAppStore';
import {GothamContext} from '../../utils/GothamContext';
import {i18n} from '../../utils/i18nUtil';

export interface GothamProviderProps {
  readonly children?: ReactNode;
  readonly config: any;
  readonly session?: any;
}

export const GothamProvider: FC<GothamProviderProps> = ({children, config, session}) => {
  const {
    isAuth,
    middleware,
    name,
    storageType,
    stores,
    translations = {translation: {}}
  } = config;

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

  return (
    <I18nextProvider i18n={i18n(translations)}>
      <GothamContext.Provider value={{Flux, isAuth, session}}>
        {children}
      </GothamContext.Provider>
    </I18nextProvider>
  );
};