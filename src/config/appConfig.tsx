/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {get} from '@nlabs/utils/objects/get';
import {merge} from '@nlabs/utils/objects/merge';

export class Config {
  static values: Record<string, unknown> = {};

  static set(values: Record<string, unknown>): Record<string, unknown> {
    return merge(this.values, values);
  }

  static get(path: string | string[], defaultValue?: unknown): unknown {
    const environment: string = process.env.NODE_ENV || 'development';
    const configValues: Record<string, unknown> = {...this.values, environment};
    return get(configValues, path, defaultValue);
  }
}
