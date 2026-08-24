/* @vitest-environment jsdom */
import {fireEvent} from '@testing-library/react';

import {registerInteractionAnalytics} from './interactionAnalytics.js';

describe('registerInteractionAnalytics', () => {
  const setup = () => {
    const awsRum = {track: vi.fn()};
    const cleanup = registerInteractionAnalytics(awsRum);

    return {awsRum, cleanup};
  };

  afterEach(() => {
    document.body.replaceChildren();
  });

  it('tracks buttons, links, and menu items through nested click targets', () => {
    const {awsRum, cleanup} = setup();
    document.body.innerHTML = `
      <button data-analytics-name="save"><span>Save</span></button>
      <a href="#secret">Account</a>
      <div role="menuitem">Settings</div>
    `;
    document.querySelector('a')?.addEventListener('click', (event) => event.preventDefault());

    fireEvent.click(document.querySelector('span') as Element);
    fireEvent.click(document.querySelector('a') as Element);
    fireEvent.click(document.querySelector('[role="menuitem"]') as Element);

    expect(awsRum.track).toHaveBeenNthCalledWith(1, {
      name: 'save',
      path: '/',
      properties: {control: 'button', interaction: 'activate'},
      type: 'click'
    });
    expect(awsRum.track).toHaveBeenNthCalledWith(2, {
      name: 'interaction',
      path: '/',
      properties: {control: 'a', interaction: 'activate'},
      type: 'click'
    });
    expect(awsRum.track).toHaveBeenNthCalledWith(3, {
      name: 'interaction',
      path: '/',
      properties: {control: 'menuitem', interaction: 'activate'},
      type: 'click'
    });
    expect(JSON.stringify(awsRum.track.mock.calls)).not.toContain('secret');

    cleanup();
  });

  it('tracks value controls once on committed change without recording values', () => {
    const {awsRum, cleanup} = setup();
    document.body.innerHTML = `
      <input data-analytics-name="volume" type="range" value="75" />
      <input type="password" value="very-secret" />
      <select><option selected value="private-value">Private label</option></select>
    `;

    const range = document.querySelector('[type="range"]') as HTMLInputElement;
    fireEvent.click(range);
    fireEvent.change(range, {target: {value: '80'}});
    fireEvent.change(document.querySelector('[type="password"]') as HTMLInputElement);
    fireEvent.change(document.querySelector('select') as HTMLSelectElement);

    expect(awsRum.track).toHaveBeenCalledTimes(3);
    expect(awsRum.track).toHaveBeenNthCalledWith(1, {
      name: 'volume',
      path: '/',
      properties: {control: 'input.range', interaction: 'change'},
      type: 'change'
    });
    expect(JSON.stringify(awsRum.track.mock.calls)).not.toMatch(/80|very-secret|private-value|Private label/);

    cleanup();
  });

  it('tracks keyboard adjustments on ARIA sliders', () => {
    const {awsRum, cleanup} = setup();
    document.body.innerHTML = '<div aria-valuenow="50" role="slider" tabindex="0"></div>';
    const slider = document.querySelector('[role="slider"]') as HTMLElement;

    fireEvent.keyUp(slider, {key: 'ArrowRight'});
    fireEvent.keyUp(slider, {key: 'Tab'});

    expect(awsRum.track).toHaveBeenCalledOnce();
    expect(awsRum.track).toHaveBeenCalledWith({
      name: 'interaction',
      path: '/',
      properties: {control: 'slider', interaction: 'change'},
      type: 'change'
    });

    cleanup();
  });

  it('tracks keyboard-only form submission and completed content edits', () => {
    const {awsRum, cleanup} = setup();
    document.body.innerHTML = `
      <form data-analytics-name="search"></form>
      <div contenteditable="true" data-analytics-name="composer">Private message</div>
    `;

    fireEvent.submit(document.querySelector('form') as HTMLFormElement);
    fireEvent.blur(document.querySelector('[contenteditable]') as HTMLElement);

    expect(awsRum.track).toHaveBeenNthCalledWith(1, {
      name: 'search',
      path: '/',
      properties: {control: 'form', interaction: 'submit'},
      type: 'submit'
    });
    expect(awsRum.track).toHaveBeenNthCalledWith(2, {
      name: 'composer',
      path: '/',
      properties: {control: 'div', interaction: 'edit'},
      type: 'edit'
    });

    cleanup();
  });

  it('ignores disabled controls and explicit private regions', () => {
    const {awsRum, cleanup} = setup();
    document.body.innerHTML = `
      <button disabled>Disabled</button>
      <div data-analytics-track="false"><a href="/private">Private</a></div>
      <div aria-disabled="true" role="button">Unavailable</div>
    `;

    document.querySelectorAll('button, a, [role="button"]').forEach((element) => fireEvent.click(element));

    expect(awsRum.track).not.toHaveBeenCalled();

    cleanup();
  });

  it('stops tracking after cleanup', () => {
    const {awsRum, cleanup} = setup();
    document.body.innerHTML = '<button>Save</button>';
    cleanup();

    fireEvent.click(document.querySelector('button') as HTMLButtonElement);

    expect(awsRum.track).not.toHaveBeenCalled();
  });
});
