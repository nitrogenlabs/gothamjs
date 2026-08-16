/* @vitest-environment jsdom */
import {renderHook} from '@testing-library/react';

import {createAwsRumDebugClient, useAwsRum} from './awsRum.js';
import {GothamContext} from './GothamContext.js';

import type {ReactNode} from 'react';

describe('useAwsRum', () => {
  it('returns the analytics client supplied by Gotham', () => {
    const awsRum = {track: vi.fn()};
    const wrapper = ({children}: {children: ReactNode}) => (
      <GothamContext.Provider value={{Flux: {} as any, awsRum}}>
        {children}
      </GothamContext.Provider>
    );

    expect(renderHook(useAwsRum, {wrapper}).result.current).toBe(awsRum);
  });
});

describe('createAwsRumDebugClient', () => {
  const event = {
    name: 'page_view',
    path: '/home',
    properties: {title: 'GothamJS'},
    type: 'page_view' as const
  };

  it('logs and forwards the exact tracking event', () => {
    const logger = vi.fn();
    const target = {track: vi.fn()};
    const awsRum = createAwsRumDebugClient({logger, target});

    awsRum.track(event);

    expect(logger).toHaveBeenCalledWith('[GothamJS] awsRum.track', event);
    expect(target.track).toHaveBeenCalledWith(event);
  });

  it('can disable logging without disabling delivery', () => {
    const logger = vi.fn();
    const target = {track: vi.fn()};
    const awsRum = createAwsRumDebugClient({enabled: false, logger, target});

    awsRum.track(event);

    expect(logger).not.toHaveBeenCalled();
    expect(target.track).toHaveBeenCalledWith(event);
  });
});
