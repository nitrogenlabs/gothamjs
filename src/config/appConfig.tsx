/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {get, merge} from '@nlabs/utils';

export class Config {
  static values: Record<string, unknown> = {};

  static set(values: Record<string, unknown>): Record<string, unknown> {
    return merge(this.values, values);
  }

  static get(path: string | string[], defaultValue?: unknown): unknown {
    const environment: string = (globalThis as any).process?.env?.NODE_ENV || 'development';
    const configValues: Record<string, unknown> = {...this.values, environment};
    return get(configValues, path, defaultValue);
  }
}
