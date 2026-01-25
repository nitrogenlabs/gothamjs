import {clear, registerFlux, registerHandler} from './navEventQueue';
import {GothamConstants} from '../constants/GothamConstants.js';

describe('navEventQueue', () => {
  beforeEach(() => clear());

  it('queues NAV_GOTO events fired before handler is registered and replays them', () => {
    const listeners: Record<string, (data: any) => void> = {};
    const fakeFlux = {
      on: (type: string, cb: (data: any) => void) => {
        listeners[type] = cb;
      }
    } as any;

    registerFlux(fakeFlux);

    // emit a nav event before handler exists
    listeners[GothamConstants.NAV_GOTO]({path: '/early'});

    const handled: any[] = [];
    registerHandler(GothamConstants.NAV_GOTO, (data: any) => handled.push(data));

    expect(handled.length).toBe(1);
    expect(handled[0].path).toBe('/early');
  });

  it('flushes queued events and does not lose future events', () => {
    const listeners: Record<string, (data: any) => void> = {};
    const fakeFlux = {on: (type: string, cb: (data: any) => void) => {
      listeners[type] = cb;
    }} as any;

    registerFlux(fakeFlux);

    listeners[GothamConstants.NAV_REPLACE]({path: '/first'});

    const handled: any[] = [];
    registerHandler(GothamConstants.NAV_REPLACE, (data: any) => handled.push(data));

    expect(handled).toHaveLength(1);
    expect(handled[0].path).toBe('/first');

    // Emit another event after handler registered
    listeners[GothamConstants.NAV_REPLACE]({path: '/second'});

    expect(handled).toHaveLength(2);
    expect(handled[1].path).toBe('/second');
  });
});
