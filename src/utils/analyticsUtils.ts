/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */

export interface GoogleAnalyticsConfig {
  readonly googleAnalyticsId?: string;
  readonly anonymizeIp?: boolean;
  readonly enabled?: boolean;
  readonly debug?: boolean;
}

export interface AnalyticsHook {
  readonly trackPageView: (path?: string, title?: string) => void;
  readonly trackEvent: (eventName: string, params?: Record<string, unknown>) => void;
  readonly trackClick: (elementName: string, params?: Record<string, unknown>) => void;
  readonly setUserId: (userId: string) => void;
  readonly setUserProperties: (properties: Record<string, unknown>) => void;
}

interface QueuedEvent {
  readonly type: 'pageview' | 'event';
  readonly args: unknown[];
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}


let analyticsConfig: GoogleAnalyticsConfig = {
  enabled: false
};
let isInitialized: boolean = false;
let isScriptLoaded: boolean = false;
let eventQueue: QueuedEvent[] = [];

// For testing: reset internal state
export const resetAnalyticsTestState = (): void => {
  analyticsConfig = {enabled: false};
  isInitialized = false;
  isScriptLoaded = false;
  eventQueue = [];
};

const log = (...args: unknown[]): void => {
  if(analyticsConfig.debug) {
    console.log('[Analytics]', ...args);
  }
};

const isEnabled = (): boolean => analyticsConfig.enabled === true && !!analyticsConfig.googleAnalyticsId;

const isBrowser = (): boolean => typeof window !== 'undefined';

const flushQueue = (): void => {
  if(eventQueue.length === 0) {
    return;
  }

  log(`Flushing ${eventQueue.length} queued events`);

  eventQueue.forEach(({type, args}) => {
    if(type === 'pageview') {
      trackPageView(...(args as [string?, string?]));
    } else if(type === 'event') {
      trackEvent(...(args as [string, Record<string, unknown>?]));
    }
  });

  eventQueue = [];
};

const loadGtagScript = (googleAnalyticsId: string): Promise<void> => new Promise((resolve, reject) => {
  if(!isBrowser()) {
    reject(new Error('Window object not available'));
    return;
  }

  if(isScriptLoaded) {
    resolve();
    return;
  }

  try {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(...gtagArgs: unknown[]) {
        window.dataLayer?.push(gtagArgs);
      };

      window.gtag('js', new Date());

      const gtagConfig: Record<string, unknown> = {};

      if(analyticsConfig.anonymizeIp) {
        gtagConfig.anonymize_ip = true;
      }

      window.gtag('config', googleAnalyticsId, gtagConfig);

      isScriptLoaded = true;
      log('Google Analytics script loaded');
      resolve();
    };

    script.onerror = () => {
      reject(new Error('Failed to load Google Analytics script'));
    };

    document.head.appendChild(script);
  } catch(error) {
    reject(error);
  }
});

export const initializeAnalytics = (config: GoogleAnalyticsConfig): void => {
  analyticsConfig = {
    anonymizeIp: config.anonymizeIp,
    debug: config.debug,
    enabled: config.enabled ?? true,
    googleAnalyticsId: config.googleAnalyticsId
  };

  if(!isEnabled()) {
    log('Analytics is disabled');
    return;
  }

  if(isInitialized) {
    log('Analytics already initialized');
    return;
  }

  if(!isBrowser()) {
    log('Window object not available, skipping initialization');
    return;
  }

  const {googleAnalyticsId} = analyticsConfig;

  if(!googleAnalyticsId) {
    log('Google Analytics ID not provided');
    return;
  }

  log('Initializing Google Analytics', googleAnalyticsId);

  loadGtagScript(googleAnalyticsId)
    .then(() => {
      isInitialized = true;
      log('Analytics initialized successfully');
      flushQueue();
    })
    .catch((error) => {
      log('Failed to initialize analytics:', error);
    });
};

export const trackPageView = (path?: string, title?: string): void => {
  if(!isEnabled()) {
    return;
  }

  const pagePath = path || (isBrowser() ? window.location.pathname : '');
  const pageTitle = title || (isBrowser() ? document.title : '');

  if(!isInitialized || !isScriptLoaded) {
    log('Queueing pageview:', pagePath);
    eventQueue.push({
      args: [pagePath, pageTitle],
      type: 'pageview'
    });
    return;
  }

  log('Tracking pageview:', pagePath, pageTitle);

  if(window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle
    });
  }
};

export const trackEvent = (eventName: string, params?: Record<string, unknown>): void => {
  if(!isEnabled()) {
    return;
  }

  if(!isInitialized || !isScriptLoaded) {
    log('Queueing event:', eventName, params);
    eventQueue.push({
      args: [eventName, params],
      type: 'event'
    });
    return;
  }

  log('Tracking event:', eventName, params);

  if(window.gtag) {
    window.gtag('event', eventName, params);
  }
};

export const trackClick = (elementName: string, params?: Record<string, unknown>): void => {
  trackEvent('click', {
    element_name: elementName,
    ...params
  });
};

export const setUserId = (userId: string): void => {
  if(!isEnabled() || !isInitialized || !isScriptLoaded) {
    return;
  }

  log('Setting user ID:', userId);

  if(window.gtag) {
    window.gtag('set', {user_id: userId});
  }
};

export const setUserProperties = (properties: Record<string, unknown>): void => {
  if(!isEnabled() || !isInitialized || !isScriptLoaded) {
    return;
  }

  log('Setting user properties:', properties);

  if(window.gtag) {
    window.gtag('set', 'user_properties', properties);
  }
};

export const useAnalytics = (): AnalyticsHook => ({
  setUserId,
  setUserProperties,
  trackClick,
  trackEvent,
  trackPageView
});
