/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
export class UserError extends Error {
  errors: string[];

  constructor(msg: string, errors: string[] = []) {
    super(msg);
    this.errors = errors || [];
  }
}
