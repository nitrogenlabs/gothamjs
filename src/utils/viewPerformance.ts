/**
 * Copyright (c) 2026-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {useContext, useEffect, useRef} from 'react';

import {GothamContext} from './GothamContext.js';

import type {AwsRum} from './awsRum.js';

export type ViewPerformanceOutcome = 'cancelled' | 'failure' | 'success' | 'timeout';
export type ViewPerformanceStatus = 'failure' | 'pending' | 'success';

export interface ViewPerformanceMeasurement {
  readonly durationMs: number;
  readonly outcome: ViewPerformanceOutcome;
  readonly route?: string;
  readonly title?: string;
  readonly viewId: string;
}

export interface StartViewOptions {
  readonly now?: () => number;
  readonly onComplete: (measurement: ViewPerformanceMeasurement) => void;
  readonly route?: string;
  readonly timeoutMs?: number;
  readonly title?: string;
  readonly viewId: string;
}

export interface ViewPerformanceHandle {
  readonly cancel: () => void;
  readonly fail: () => void;
  readonly succeed: () => void;
  readonly timeout: () => void;
}

export interface UseViewPerformanceOptions {
  readonly route?: string;
  readonly status: ViewPerformanceStatus;
  readonly timeoutMs?: number;
  readonly title?: string;
  readonly viewId: string;
}

const DEFAULT_TIMEOUT_MS = 30_000;
const normalizeDuration = (duration: number): number => Math.max(0, Math.round(duration));

export const startView = ({
  now = () => globalThis.performance?.now?.() ?? Date.now(),
  onComplete,
  route,
  timeoutMs = DEFAULT_TIMEOUT_MS,
  title,
  viewId
}: StartViewOptions): ViewPerformanceHandle => {
  const startedAt = now();
  let complete = false;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const finish = (outcome: ViewPerformanceOutcome): void => {
    if(complete) {
      return;
    }

    complete = true;
    if(timer) {
      clearTimeout(timer);
      timer = undefined;
    }
    onComplete({
      durationMs: normalizeDuration(now() - startedAt),
      outcome,
      ...(route ? {route} : {}),
      ...(title ? {title} : {}),
      viewId
    });
  };

  if(timeoutMs > 0) {
    timer = setTimeout(() => finish('timeout'), timeoutMs);
  }

  return {
    cancel: () => finish('cancelled'),
    fail: () => finish('failure'),
    succeed: () => finish('success'),
    timeout: () => finish('timeout')
  };
};

export const reportViewPerformance = (
  awsRum: AwsRum | undefined,
  measurement: ViewPerformanceMeasurement
): void => {
  awsRum?.track({
    name: 'view_performance',
    ...(measurement.route ? {path: measurement.route} : {}),
    properties: {
      durationMs: measurement.durationMs,
      outcome: measurement.outcome,
      ...(measurement.title ? {viewTitle: measurement.title} : {}),
      viewId: measurement.viewId
    },
    type: 'view_performance'
  });
};

export const useViewPerformance = ({
  route,
  status,
  timeoutMs,
  title,
  viewId
}: UseViewPerformanceOptions): void => {
  const {awsRum} = useContext(GothamContext);
  const handleRef = useRef<ViewPerformanceHandle | undefined>(undefined);
  const statusRef = useRef(status);
  statusRef.current = status;

  useEffect(() => {
    const handle = startView({
      onComplete: (measurement) => reportViewPerformance(awsRum, measurement),
      route,
      timeoutMs,
      title,
      viewId
    });
    handleRef.current = handle;

    if(statusRef.current === 'failure') {
      handle.fail();
    } else if(statusRef.current === 'success') {
      handle.succeed();
    }

    return () => {
      handle.cancel();
      if(handleRef.current === handle) {
        handleRef.current = undefined;
      }
    };
  }, [awsRum, route, timeoutMs, title, viewId]);

  useEffect(() => {
    if(status === 'failure') {
      handleRef.current?.fail();
    } else if(status === 'success') {
      handleRef.current?.succeed();
    }
  }, [status]);
};
