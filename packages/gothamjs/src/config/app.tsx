/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import get from 'lodash/get';
import merge from 'lodash/merge';

export class Config {
  static values: any = {};

  static set(values: object): any {
    return merge(this.values, values);
  }

  static get(path: string | string[], defaultValue?: any): any {
    const environment: string = process.env.NODE_ENV || 'development';
    const configValues: object = {...this.values, environment};
    console.log('get::path', path, configValues);
    console.log('get::configValues', configValues);
    console.log('get::value', get(configValues, path, defaultValue));
    return get(configValues, path, defaultValue);
  }
}
