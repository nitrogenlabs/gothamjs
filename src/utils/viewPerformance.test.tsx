/* @vitest-environment jsdom */
import {act, render} from '@testing-library/react';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import {GothamContext} from './GothamContext.js';
import {startView, useViewPerformance} from './viewPerformance.js';

const TestView = ({status}: {status: 'pending' | 'success'}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks -- TestView is a React test component.
  useViewPerformance({route: '/docs', status, title: 'Documentation', viewId: 'www.documentation'});

  return null;
};

describe('startView', () => {
  beforeEach(() => vi.useFakeTimers());

  afterEach(() => vi.useRealTimers());

  it('emits exactly one terminal measurement', () => {
    const onComplete = vi.fn();
    let now = 10;
    const view = startView({now: () => now, onComplete, route: '/docs', viewId: 'docs'});

    now = 135;
    view.succeed();
    view.fail();

    expect(onComplete).toHaveBeenCalledOnce();
    expect(onComplete).toHaveBeenCalledWith({durationMs: 125, outcome: 'success', route: '/docs', viewId: 'docs'});
  });

  it('times out an unfinished view', () => {
    const onComplete = vi.fn();
    startView({now: () => Date.now(), onComplete, timeoutMs: 1000, viewId: 'slow-view'});

    vi.advanceTimersByTime(1000);

    expect(onComplete).toHaveBeenCalledWith(expect.objectContaining({durationMs: 1000, outcome: 'timeout'}));
  });
});

describe('useViewPerformance', () => {
  beforeEach(() => vi.useFakeTimers());

  afterEach(() => vi.useRealTimers());

  it('reports a stable view id and successful duration through Gotham analytics', () => {
    const awsRum = {track: vi.fn()};
    const {rerender} = render(
      <GothamContext.Provider value={{Flux: {} as any, awsRum}}>
        <TestView status="pending" />
      </GothamContext.Provider>
    );

    act(() => vi.advanceTimersByTime(245));
    rerender(
      <GothamContext.Provider value={{Flux: {} as any, awsRum}}>
        <TestView status="success" />
      </GothamContext.Provider>
    );

    expect(awsRum.track).toHaveBeenCalledWith({
      name: 'view_performance',
      path: '/docs',
      properties: {durationMs: 245, outcome: 'success', viewId: 'www.documentation', viewTitle: 'Documentation'},
      type: 'view_performance'
    });
  });
});
