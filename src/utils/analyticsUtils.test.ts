/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {renderHook} from '@testing-library/react';
import {
  forceAnalyticsInitializedForTesting,
  initializeAnalytics,
  resetAnalyticsTestState,
  setUserId,
  setUserProperties,
  trackClick,
  trackEvent,
  trackPageView,
  useAnalytics
} from './analyticsUtils.js';

describe('analyticsUtils', () => {
  let mockGtag: jest.Mock;
  let mockDataLayer: unknown[];
  let appendChildSpy: jest.SpyInstance;
  let createElementSpy: jest.SpyInstance;

  beforeEach(() => {
    mockGtag = jest.fn();
    mockDataLayer = [];

    delete (window as {gtag?: unknown}).gtag;
    delete (window as {dataLayer?: unknown}).dataLayer;

    appendChildSpy = jest.spyOn(document.head, 'appendChild');
    createElementSpy = jest.spyOn(document, 'createElement');

    (window as {gtag?: unknown}).gtag = undefined;
    (window as {dataLayer?: unknown}).dataLayer = undefined;


    resetAnalyticsTestState();

    jest.clearAllMocks();
  });

  afterEach(() => {
    appendChildSpy.mockRestore();
    createElementSpy.mockRestore();
    delete (window as {gtag?: unknown}).gtag;
    delete (window as {dataLayer?: unknown}).dataLayer;
  });

  describe('initializeAnalytics', () => {
    it('should initialize with valid configuration', (done) => {
      const config = {
        enabled: true,
        googleAnalyticsId: 'G-TEST123'
      };

      // Fail-safe: if done is not called in 2s, fail the test
      const timeout = setTimeout(() => {
        done.fail('Test timed out: async callback not called');
      }, 2000);

      appendChildSpy.mockImplementation((element: HTMLScriptElement) => {
        window.dataLayer = mockDataLayer;

        if(element.onload) {
          element.onload(new Event('load'));
        }

        // Force initialization for testing
        forceAnalyticsInitializedForTesting();

        try {
          expect(mockDataLayer).toEqual([
            ['js', expect.any(Date)],
            ['config', 'G-TEST123', {}]
          ]);

          clearTimeout(timeout);
          done();
        } catch(err) {
          clearTimeout(timeout);
          done(err);
        }
        return element;
      });

      initializeAnalytics(config);

      expect(createElementSpy).toHaveBeenCalledWith('script');
      expect(appendChildSpy).toHaveBeenCalled();
    });

    it('should not initialize when disabled', () => {
      const config = {
        enabled: false,
        googleAnalyticsId: 'G-TEST123'
      };

      initializeAnalytics(config);

      expect(createElementSpy).not.toHaveBeenCalled();

      expect(appendChildSpy).not.toHaveBeenCalled();
    });

    it('should not initialize without Google Analytics ID', () => {
      const config = {
        enabled: true
      };

      initializeAnalytics(config);

      expect(createElementSpy).not.toHaveBeenCalled();

      expect(appendChildSpy).not.toHaveBeenCalled();
    });

    it('should enable IP anonymization when configured', (done) => {
      const config = {
        anonymizeIp: true,
        enabled: true,
        googleAnalyticsId: 'G-TEST123'
      };

      appendChildSpy.mockImplementation((element: HTMLScriptElement) => {
        window.dataLayer = mockDataLayer;

        if(element.onload) {
          element.onload(new Event('load'));
        }

        expect(mockDataLayer[1]).toEqual(['config', 'G-TEST123', {anonymize_ip: true}]);

        done();
        return element;
      });

      initializeAnalytics(config);
    });

    it('should handle script loading errors gracefully', (done) => {
      const config = {
        enabled: true,
        googleAnalyticsId: 'G-TEST123'
      };

      appendChildSpy.mockImplementation((element: HTMLScriptElement) => {
        if(element.onerror) {
          element.onerror(new Event('error'));
        }
        done();
        return element;
      });

      initializeAnalytics(config);
    });
  });

  describe('trackPageView', () => {
    beforeEach(() => {
      window.gtag = mockGtag;
      window.dataLayer = mockDataLayer;
    });

    it('should track page view with provided path and title', (done) => {
      const config = {
        enabled: true,
        googleAnalyticsId: 'G-TEST123'
      };

      appendChildSpy.mockImplementation((element: HTMLScriptElement) => {
        if(element.onload) {
          element.onload(new Event('load'));
        }
        // Override window.gtag with mock after onload
        window.gtag = mockGtag;
        window.dataLayer = mockDataLayer;

        // Force initialization for testing
        forceAnalyticsInitializedForTesting();

        trackPageView('/test-path', 'Test Title');

        expect(mockGtag).toHaveBeenCalledWith('event', 'page_view', {
          page_path: '/test-path',
          page_title: 'Test Title'
        });

        done();
        return element;
      });

      initializeAnalytics(config);
    });

    it('should use current location when path not provided', (done) => {
      const config = {
        enabled: true,
        googleAnalyticsId: 'G-TEST123'
      };

      appendChildSpy.mockImplementation((element: HTMLScriptElement) => {
        if(element.onload) {
          element.onload(new Event('load'));
        }
        // Override window.gtag with mock after onload
        window.gtag = mockGtag;
        window.dataLayer = mockDataLayer;

        // Force initialization for testing
        forceAnalyticsInitializedForTesting();

        trackPageView();

        expect(mockGtag).toHaveBeenCalledWith('event', 'page_view', {
          page_path: '/',
          page_title: ''
        });

        done();
        return element;
      });

      initializeAnalytics(config);
    });

    it('should not track when analytics is disabled', () => {
      const config = {
        enabled: false,
        googleAnalyticsId: 'G-TEST123'
      };

      initializeAnalytics(config);
      trackPageView('/test-path');

      expect(mockGtag).not.toHaveBeenCalled();
    });
  });

  describe('trackEvent', () => {
    beforeEach(() => {
      window.gtag = mockGtag;
      window.dataLayer = mockDataLayer;
    });

    it('should track custom event with parameters', (done) => {
      const config = {
        enabled: true,
        googleAnalyticsId: 'G-TEST123'
      };

      appendChildSpy.mockImplementation((element: HTMLScriptElement) => {
        if(element.onload) {
          element.onload(new Event('load'));
        }
        // Override window.gtag with mock after onload
        window.gtag = mockGtag;
        window.dataLayer = mockDataLayer;

        // Force initialization for testing
        forceAnalyticsInitializedForTesting();

        trackEvent('button_click', {button_name: 'signup'});

        expect(mockGtag).toHaveBeenCalledWith('event', 'button_click', {button_name: 'signup'});

        done();
        return element;
      });

      initializeAnalytics(config);
    });

    it('should track event without parameters', (done) => {
      const config = {
        enabled: true,
        googleAnalyticsId: 'G-TEST123'
      };

      appendChildSpy.mockImplementation((element: HTMLScriptElement) => {
        if(element.onload) {
          element.onload(new Event('load'));
        }
        // Override window.gtag with mock after onload
        window.gtag = mockGtag;
        window.dataLayer = mockDataLayer;

        // Force initialization for testing
        forceAnalyticsInitializedForTesting();

        trackEvent('custom_event');

        expect(mockGtag).toHaveBeenCalledWith('event', 'custom_event', undefined);

        done();
        return element;
      });

      initializeAnalytics(config);
    });

    it('should not track when analytics is disabled', () => {
      const config = {
        enabled: false,
        googleAnalyticsId: 'G-TEST123'
      };

      initializeAnalytics(config);
      trackEvent('test_event');

      expect(mockGtag).not.toHaveBeenCalled();
    });
  });

  describe('trackClick', () => {
    beforeEach(() => {
      window.gtag = mockGtag;
      window.dataLayer = mockDataLayer;
    });

    it('should track click with element name', (done) => {
      const config = {
        enabled: true,
        googleAnalyticsId: 'G-TEST123'
      };

      appendChildSpy.mockImplementation((element: HTMLScriptElement) => {
        if(element.onload) {
          element.onload(new Event('load'));
        }
        // Override window.gtag with mock after onload
        window.gtag = mockGtag;
        window.dataLayer = mockDataLayer;

        // Force initialization for testing
        forceAnalyticsInitializedForTesting();

        trackClick('CTA Button');

        expect(mockGtag).toHaveBeenCalledWith('event', 'click', {
          element_name: 'CTA Button'
        });

        done();
        return element;
      });

      initializeAnalytics(config);
    });

    it('should track click with additional parameters', (done) => {
      const config = {
        enabled: true,
        googleAnalyticsId: 'G-TEST123'
      };

      appendChildSpy.mockImplementation((element: HTMLScriptElement) => {
        if(element.onload) {
          element.onload(new Event('load'));
        }
        // Override window.gtag with mock after onload
        window.gtag = mockGtag;
        window.dataLayer = mockDataLayer;

        // Force initialization for testing
        forceAnalyticsInitializedForTesting();

        trackClick('CTA Button', {location: 'header'});

        expect(mockGtag).toHaveBeenCalledWith('event', 'click', {
          element_name: 'CTA Button',
          location: 'header'
        });

        done();
        return element;
      });

      initializeAnalytics(config);
    });
  });

  describe('setUserId', () => {
    beforeEach(() => {
      window.gtag = mockGtag;
      window.dataLayer = mockDataLayer;
    });

    it('should set user ID', (done) => {
      const config = {
        enabled: true,
        googleAnalyticsId: 'G-TEST123'
      };

      appendChildSpy.mockImplementation((element: HTMLScriptElement) => {
        if(element.onload) {
          element.onload(new Event('load'));
        }
        // Override window.gtag with mock after onload
        window.gtag = mockGtag;
        window.dataLayer = mockDataLayer;

        // Force initialization for testing
        forceAnalyticsInitializedForTesting();

        setUserId('user-12345');

        expect(mockGtag).toHaveBeenCalledWith('set', {user_id: 'user-12345'});

        done();
        return element;
      });

      initializeAnalytics(config);
    });
  });

  describe('setUserProperties', () => {
    beforeEach(() => {
      window.gtag = mockGtag;
      window.dataLayer = mockDataLayer;
    });

    it('should set user properties', (done) => {
      const config = {
        enabled: true,
        googleAnalyticsId: 'G-TEST123'
      };

      appendChildSpy.mockImplementation((element: HTMLScriptElement) => {
        if(element.onload) {
          element.onload(new Event('load'));
        }
        // Override window.gtag with mock after onload
        window.gtag = mockGtag;
        window.dataLayer = mockDataLayer;

        // Force initialization for testing
        forceAnalyticsInitializedForTesting();

        setUserProperties({country: 'US', plan: 'premium'});

        expect(mockGtag).toHaveBeenCalledWith('set', 'user_properties', {country: 'US', plan: 'premium'});

        done();
        return element;
      });

      initializeAnalytics(config);
    });
  });

  describe('useAnalytics hook', () => {
    it('should return tracking functions', () => {
      const {result} = renderHook(() => useAnalytics());

      expect(result.current.trackPageView).toBeDefined();
      expect(result.current.trackEvent).toBeDefined();
      expect(result.current.trackClick).toBeDefined();
      expect(result.current.setUserId).toBeDefined();
      expect(result.current.setUserProperties).toBeDefined();
    });

    it('should call trackEvent when used', (done) => {
      const config = {
        enabled: true,
        googleAnalyticsId: 'G-TEST123'
      };

      appendChildSpy.mockImplementation((element: HTMLScriptElement) => {
        if(element.onload) {
          element.onload(new Event('load'));
        }
        // Override window.gtag with mock after onload
        window.gtag = mockGtag;
        window.dataLayer = mockDataLayer;

        // Force initialization for testing
        forceAnalyticsInitializedForTesting();

        const {result} = renderHook(() => useAnalytics());
        result.current.trackEvent('hook_event', {test: true});

        expect(mockGtag).toHaveBeenCalledWith('event', 'hook_event', {test: true});

        done();
        return element;
      });

      initializeAnalytics(config);
    });
  });

  describe('event queue', () => {
    it('should queue events before initialization and flush after', (done) => {
      const config = {
        enabled: true,
        googleAnalyticsId: 'G-TEST123'
      };

      appendChildSpy.mockImplementation((element: HTMLScriptElement) => {
        // Force initialization for testing before onload
        forceAnalyticsInitializedForTesting();

        if(element.onload) {
          element.onload(new Event('load'));
        }

        // Override window.gtag with mock after onload
        window.gtag = mockGtag;

        return element;
      });

      initializeAnalytics(config);

      // Now analytics is initialized but script not loaded, so queue
      trackPageView('/early-page');
      trackEvent('early_event', {value: 1});

      // The onload should have flushed the queue synchronously for testing
      expect(mockGtag).toHaveBeenCalledTimes(2);
      expect(mockGtag).toHaveBeenCalledWith('event', 'page_view', expect.any(Object));
      expect(mockGtag).toHaveBeenCalledWith('event', 'early_event', {value: 1});

      done();
    });
  });

  describe('debug mode', () => {
    let consoleLogSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
      consoleLogSpy.mockRestore();
    });

    it('should log debug messages when debug is enabled', () => {
      resetAnalyticsTestState();
      const config = {
        debug: true,
        enabled: true,
        googleAnalyticsId: 'G-TEST123'
      };

      initializeAnalytics(config);

      expect(consoleLogSpy).toHaveBeenCalledWith('[Analytics]', 'Initializing Google Analytics', 'G-TEST123');
    });

    it('should not log debug messages when debug is disabled', () => {
      const config = {
        debug: false,
        enabled: true,
        googleAnalyticsId: 'G-TEST123'
      };

      initializeAnalytics(config);

      expect(consoleLogSpy).not.toHaveBeenCalled();
    });
  });
});
