/**
 * Copyright (c) 2026-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import type {AwsRum} from './awsRum.js';

type InteractionKind = 'activate' | 'change' | 'edit' | 'submit';

const ACTIVATION_SELECTOR = [
  'a[href]',
  'area[href]',
  'button',
  'input[type="button"]',
  'input[type="image"]',
  'input[type="reset"]',
  'input[type="submit"]',
  'summary',
  '[role="button"]',
  '[role="checkbox"]',
  '[role="link"]',
  '[role="menuitem"]',
  '[role="menuitemcheckbox"]',
  '[role="menuitemradio"]',
  '[role="option"]',
  '[role="radio"]',
  '[role="slider"]',
  '[role="switch"]',
  '[role="tab"]',
  '[role="treeitem"]',
  '[data-analytics-interaction="click"]'
].join(',');

const EDITABLE_SELECTOR = '[contenteditable=""], [contenteditable="true"]';
const KEYBOARD_VALUE_SELECTOR = '[role="slider"], [role="spinbutton"]';
const VALUE_KEYS = new Set(['ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'End', 'Home', 'PageDown', 'PageUp']);
const NATIVE_VALUE_SELECTOR = [
  'input:not([type="button"]):not([type="hidden"]):not([type="image"]):not([type="reset"]):not([type="submit"])',
  'select',
  'textarea'
].join(',');
const VALUE_SELECTOR = [
  NATIVE_VALUE_SELECTOR,
  '[role="checkbox"]',
  '[role="combobox"]',
  '[role="listbox"]',
  '[role="radio"]',
  '[role="slider"]',
  '[role="spinbutton"]',
  '[role="switch"]',
  '[data-analytics-interaction="change"]'
].join(',');

const findTarget = (event: Event, selector: string): Element | undefined => {
  const path = typeof event.composedPath === 'function' ? event.composedPath() : [event.target];

  return path.find((item): item is Element => item instanceof Element && item.matches(selector));
};

const getControl = (element: Element): string => {
  const role = element.getAttribute('role');

  if(role) {
    return role;
  }

  if(element instanceof HTMLInputElement) {
    return `input.${element.type || 'text'}`;
  }

  return element.tagName.toLowerCase();
};

const isTrackable = (element: Element): boolean => {
  const disabled = element.getAttribute('aria-disabled') === 'true'
    || (element instanceof HTMLButtonElement && element.disabled)
    || (element instanceof HTMLInputElement && element.disabled)
    || (element instanceof HTMLSelectElement && element.disabled)
    || (element instanceof HTMLTextAreaElement && element.disabled);

  return !disabled && !element.closest('[data-analytics-track="false"]');
};

const trackInteraction = (awsRum: AwsRum, element: Element, interaction: InteractionKind): void => {
  if(!isTrackable(element)) {
    return;
  }

  const analyticsName = element.getAttribute('data-analytics-name')?.trim();

  awsRum.track({
    name: analyticsName || 'interaction',
    path: globalThis.location?.pathname,
    properties: {
      control: getControl(element),
      interaction
    },
    type: interaction === 'activate' ? 'click' : interaction
  });
};

/**
 * Tracks semantic interactions with one delegated listener per event type.
 * Values, visible text, URLs, and query strings are deliberately excluded.
 */
export const registerInteractionAnalytics = (
  awsRum: AwsRum,
  ownerDocument: Document | undefined = globalThis.document
): (() => void) => {
  if(!ownerDocument) {
    return () => {};
  }

  const handleBlur = (event: Event): void => {
    const target = findTarget(event, EDITABLE_SELECTOR);

    if(target) {
      trackInteraction(awsRum, target, 'edit');
    }
  };
  const handleChange = (event: Event): void => {
    const target = findTarget(event, VALUE_SELECTOR);

    if(target) {
      trackInteraction(awsRum, target, 'change');
    }
  };
  const handleClick = (event: Event): void => {
    const target = findTarget(event, ACTIVATION_SELECTOR);

    if(target && !target.matches(NATIVE_VALUE_SELECTOR)) {
      trackInteraction(awsRum, target, 'activate');
    }
  };
  const handleSubmit = (event: Event): void => {
    const submitEvent = event as SubmitEvent;

    if(!submitEvent.submitter && event.target instanceof HTMLFormElement) {
      trackInteraction(awsRum, event.target, 'submit');
    }
  };
  const handleValueKey = (event: Event): void => {
    const keyboardEvent = event as KeyboardEvent;
    const target = findTarget(event, KEYBOARD_VALUE_SELECTOR);

    if(target && VALUE_KEYS.has(keyboardEvent.key)) {
      trackInteraction(awsRum, target, 'change');
    }
  };

  ownerDocument.addEventListener('blur', handleBlur, true);
  ownerDocument.addEventListener('change', handleChange, true);
  ownerDocument.addEventListener('click', handleClick, true);
  ownerDocument.addEventListener('keyup', handleValueKey, true);
  ownerDocument.addEventListener('submit', handleSubmit, true);

  return () => {
    ownerDocument.removeEventListener('blur', handleBlur, true);
    ownerDocument.removeEventListener('change', handleChange, true);
    ownerDocument.removeEventListener('click', handleClick, true);
    ownerDocument.removeEventListener('keyup', handleValueKey, true);
    ownerDocument.removeEventListener('submit', handleSubmit, true);
  };
};
