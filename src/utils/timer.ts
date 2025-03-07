/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
/**
 * Create a Timer
 * @param {Number} delay
 * @param {Function} callback
 * @constructor
 */
export class GothamTimer {
  timerId: unknown;
  start: number = 0;
  remaining: number = 0;
  delay: number = 0;
  callback: unknown;

  constructor(delay: number, callback: unknown) {
    this.callback = callback;
    this.delay = delay;
    this.remaining = delay;

    // Methods
    this.getTimeRemaining = this.getTimeRemaining.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
  }

  pause() {
    clearTimeout(this.timerId as number);
    this.remaining -= (+(new Date()) - this.start);
  }

  resume() {
    this.start = +(new Date());
    clearTimeout(this.timerId as number);
    this.timerId = setTimeout(this.callback as () => void, this.remaining);
  }

  getTimeRemaining() {
    return this.remaining;
  }
}
