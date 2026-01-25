/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {renderHook} from '@testing-library/react';
import {
  initializeAnalytics,
  trackPageView,
  trackEvent,
  trackClick,
  setUserId,
  setUserProperties,
  useAnalytics
} from './analyticsUtils';

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
        googleAnalyticsId: 'G-TEST123',
        enabled: true
      };

      appendChildSpy.mockImplementation((element: HTMLScriptElement) => {
        setTimeout(() => {
          window.dataLayer = mockDataLayer;
          window.gtag = mockGtag;
          
          if(element.onload) {
            element.onload(new Event('load'));
          }
          
          expect(mockGtag).toHaveBeenCalledWith('js', expect.any(Date));
          expect(mockGtag).toHaveBeenCalledWith('config', 'G-TEST123', {});
          done();
        }, 0);
        return element;
      });

      initializeAnalytics(config);

      expect(createElementSpy).toHaveBeenCalledWith('script');
      expect(appendChildSpy).toHaveBeenCalled();
    });

    it('should not initialize when disabled', () => {
      const config = {
        googleAnalyticsId: 'G-TEST123',
        enabled: false
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
        googleAnalyticsId: 'G-TEST123',
        anonymizeIp: true,
        enabled: true
      };

      appendChildSpy.mockImplementation((element: HTMLScriptElement) => {
        setTimeout(() => {
          window.dataLayer = mockDataLayer;
          window.gtag = mockGtag;
          
          if(element.onload) {
            element.onload(new Event('load'));
          }
          
          expect(mockGtag).toHaveBeenCalledWith('config', 'G-TEST123', {anonymize_ip: true});
          done();
        }, 0);
        return element;
      });

      initializeAnalytics(config);
    });

    it('should handle script loading errors gracefully', (done) => {
      const config = {
        googleAnalyticsId: 'G-TEST123',
        enabled: true
      };

      appendChildSpy.mockImplementation((element: HTMLScriptElement) => {
        setTimeout(() => {
          if(element.onerror) {
            element.onerror(new Event('error'));
          }
          done();
        }, 0);
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
        googleAnalyticsId: 'G-TEST123',
        enabled: true
      };

      appendChildSpy.mockImplementation((element: HTMLScriptElement) => {
        setTimeout(() => {
          window.gtag = mockGtag;
          window.dataLayer = mockDataLayer;
          
          if(element.onload) {
            element.onload(new Event('load'));
          }

          trackPageView('/test-path', 'Test Title');
          
          expect(mockGtag).toHaveBeenCalledWith('event', 'page_view', {
            page_path: '/test-path',
            page_title: 'Test Title'
          });
          done();
        }, 0);
        return element;
      });

      initializeAnalytics(config);
    });

    it('should use current location when path not provided', (done) => {
      Object.defineProperty(window, 'location', {
        value: {pathname: '/current-path'},
        writable: true,
        configurable: true
      });

      Object.defineProperty(document, 'title', {
        value: 'Current Title',
        writable: true,
        configurable: true
      });

      const config = {
        googleAnalyticsId: 'G-TEST123',
        enabled: true
      };

      appendChildSpy.mockImplementation((element: HTMLScriptElement) => {
        setTimeout(() => {
          window.gtag = mockGtag;
          window.dataLayer = mockDataLayer;
          
          if(element.onload) {
            element.onload(new Event('load'));
          }

          trackPageView();
          
          expect(mockGtag).toHaveBeenCalledWith('event', 'page_view', {
            page_path: '/current-path',
            page_title: 'Current Title'
          });
          done();
        }, 0);
        return element;
      });

      initializeAnalytics(config);
    });

    it('should not track when analytics is disabled', () => {
      const config = {
        googleAnalyticsId: 'G-TEST123',
        enabled: false
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
        googleAnalyticsId: 'G-TEST123',
        enabled: true
      };

      appendChildSpy.mockImplementation((element: HTMLScriptElement) => {
        setTimeout(() => {
          window.gtag = mockGtag;
          window.dataLayer = mockDataLayer;
          
          if(element.onload) {
            element.onload(new Event('load'));
          }

          trackEvent('button_click', {button_name: 'signup'});
          
          expect(mockGtag).toHaveBeenCalledWith('event', 'button_click', {button_name: 'signup'});
          done();
        }, 0);
        return element;
      });

      initializeAnalytics(config);
    });

    it('should track event without parameters', (done) => {
      const config = {
        googleAnalyticsId: 'G-TEST123',
        enabled: true
      };

      appendChildSpy.mockImplementation((element: HTMLScriptElement) => {
        setTimeout(() => {
          window.gtag = mockGtag;
          window.dataLayer = mockDataLayer;
          
          if(element.onload) {
            element.onload(new Event('load'));
          }

          trackEvent('custom_event');
          
          expect(mockGtag).toHaveBeenCalledWith('event', 'custom_event', undefined);
          done();
        }, 0);
        return element;
      });

      initializeAnalytics(config);
    });

    it('should not track when analytics is disabled', () => {
      const config = {
        googleAnalyticsId: 'G-TEST123',
        enabled: false
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
        googleAnalyticsId: 'G-TEST123',
        enabled: true
      };

      appendChildSpy.mockImplementation((element: HTMLScriptElement) => {
        setTimeout(() => {
          window.gtag = mockGtag;
          window.dataLayer = mockDataLayer;
          
          if(element.onload) {
            element.onload(new Event('load'));
          }

          trackClick('CTA Button');
          
          expect(mockGtag).toHaveBeenCalledWith('event', 'click', {
            element_name: 'CTA Button'
          });
          done();
        }, 0);
        return element;
      });

      initializeAnalytics(config);
    });

    it('should track click with additional parameters', (done) => {
      const config = {
        googleAnalyticsId: 'G-TEST123',
        enabled: true
      };

      appendChildSpy.mockImplementation((element: HTMLScriptElement) => {
        setTimeout(() => {
          window.gtag = mockGtag;
          window.dataLayer = mockDataLayer;
          
          if(element.onload) {
            element.onload(new Event('load'));
          }

          trackClick('CTA Button', {location: 'header'});
          
          expect(mockGtag).toHaveBeenCalledWith('event', 'click', {
            element_name: 'CTA Button',
            location: 'header'
          });
          done();
        }, 0);
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
        googleAnalyticsId: 'G-TEST123',
        enabled: true
      };

      appendChildSpy.mockImplementation((element: HTMLScriptElement) => {
        setTimeout(() => {
          window.gtag = mockGtag;
          window.dataLayer = mockDataLayer;
          
          if(element.onload) {
            element.onload(new Event('load'));
          }

          setUserId('user-12345');
          
          expect(mockGtag).toHaveBeenCalledWith('set', {user_id: 'user-12345'});
          done();
        }, 0);
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
        googleAnalyticsId: 'G-TEST123',
        enabled: true
      };

      appendChildSpy.mockImplementation((element: HTMLScriptElement) => {
        setTimeout(() => {
          window.gtag = mockGtag;
          window.dataLayer = mockDataLayer;
          
          if(element.onload) {
            element.onload(new Event('load'));
          }

          setUserProperties({plan: 'premium', country: 'US'});
          
          expect(mockGtag).toHaveBeenCalledWith('set', 'user_properties', {plan: 'premium', country: 'US'});
          done();
        }, 0);
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
        googleAnalyticsId: 'G-TEST123',
        enabled: true
      };

      appendChildSpy.mockImplementation((element: HTMLScriptElement) => {
        setTimeout(() => {
          window.gtag = mockGtag;
          window.dataLayer = mockDataLayer;
          
          if(element.onload) {
            element.onload(new Event('load'));
          }

          const {result} = renderHook(() => useAnalytics());
          result.current.trackEvent('hook_event', {test: true});
          
          expect(mockGtag).toHaveBeenCalledWith('event', 'hook_event', {test: true});
          done();
        }, 0);
        return element;
      });

      initializeAnalytics(config);
    });
  });

  describe('event queue', () => {
    it('should queue events before initialization and flush after', (done) => {
      const config = {
        googleAnalyticsId: 'G-TEST123',
        enabled: true
      };

      trackPageView('/early-page');
      trackEvent('early_event', {value: 1});

      appendChildSpy.mockImplementation((element: HTMLScriptElement) => {
        setTimeout(() => {
          window.gtag = mockGtag;
          window.dataLayer = mockDataLayer;
          
          if(element.onload) {
            element.onload(new Event('load'));
          }

          setTimeout(() => {
            expect(mockGtag).toHaveBeenCalledWith('event', 'page_view', {
              page_path: '/early-page',
              page_title: ''
            });
            expect(mockGtag).toHaveBeenCalledWith('event', 'early_event', {value: 1});
            done();
          }, 100);
        }, 0);
        return element;
      });

      initializeAnalytics(config);
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
      const config = {
        googleAnalyticsId: 'G-TEST123',
        enabled: true,
        debug: true
      };

      initializeAnalytics(config);

      expect(consoleLogSpy).toHaveBeenCalledWith('[Analytics]', 'Initializing Google Analytics', 'G-TEST123');
    });

    it('should not log debug messages when debug is disabled', () => {
      const config = {
        googleAnalyticsId: 'G-TEST123',
        enabled: true,
        debug: false
      };

      initializeAnalytics(config);

      expect(consoleLogSpy).not.toHaveBeenCalled();
    });
  });
});
