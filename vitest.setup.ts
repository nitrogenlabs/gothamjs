import '@testing-library/jest-dom/vitest';
import {vi} from 'vitest';
import {TextDecoder, TextEncoder} from 'node:util';

globalThis.jest = vi as never;

globalThis.TextEncoder = TextEncoder as never;
globalThis.TextDecoder = TextDecoder as never;

class ResizeObserverMock {
  disconnect = vi.fn();
  observe = vi.fn();
  unobserve = vi.fn();
}

globalThis.ResizeObserver = ResizeObserverMock as never;

global.matchMedia = vi.fn().mockImplementation(query => ({
  addEventListener: vi.fn(),
  addListener: vi.fn(),
  dispatchEvent: vi.fn(),
  matches: false,
  media: query,
  onchange: null,
  removeEventListener: vi.fn(),
  removeListener: vi.fn()
}));
