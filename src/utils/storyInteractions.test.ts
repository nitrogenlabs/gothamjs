/* @vitest-environment jsdom */
import {vi} from 'vitest';

import {focusCanvas, interactWithCanvas} from './storyInteractions.js';

describe('storyInteractions', () => {
  it('clicks anchors without changing the iframe hash', async () => {
    const canvasElement = document.createElement('div');
    const link = document.createElement('a');
    const onClick = vi.fn();

    window.history.replaceState(null, '', '/iframe.html?id=components-navbar--default');
    link.href = '#overview';
    link.textContent = 'Overview';
    link.addEventListener('click', onClick);
    canvasElement.append(link);

    await interactWithCanvas({canvasElement});

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(window.location.hash).toBe('');
    expect(document.activeElement).not.toBe(link);
  });

  it('still clicks buttons normally', async () => {
    const canvasElement = document.createElement('div');
    const button = document.createElement('button');
    const onClick = vi.fn();

    button.textContent = 'Open';
    button.addEventListener('click', onClick);
    canvasElement.append(button);

    await interactWithCanvas({canvasElement});

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(document.activeElement).not.toBe(button);
  });

  it('does not leave the first focusable element active', async () => {
    const canvasElement = document.createElement('div');
    const button = document.createElement('button');

    button.textContent = 'Open';
    canvasElement.append(button);
    document.body.append(canvasElement);

    await focusCanvas({canvasElement});

    expect(document.activeElement).not.toBe(button);

    canvasElement.remove();
  });
});
