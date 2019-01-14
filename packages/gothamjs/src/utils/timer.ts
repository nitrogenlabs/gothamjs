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
  timerId: any;
  start: number = 0;
  remaining: number = 0;
  delay: number = 0;
  callback: any;

  constructor(delay: number, callback: any) {
    this.callback = callback;
    this.delay = delay;
    this.remaining = delay;

    // Methods
    this.getTimeRemaining = this.getTimeRemaining.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
  }

  pause() {
    clearTimeout(this.timerId);
    this.remaining -= (+(new Date()) - this.start);
  }

  resume() {
    this.start = +(new Date());
    clearTimeout(this.timerId);
    this.timerId = setTimeout(this.callback, this.remaining);
  }

  getTimeRemaining() {
    return this.remaining;
  }
}
