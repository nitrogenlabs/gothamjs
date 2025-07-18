/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
export type GothamColor = 'primary' | 'secondary' | 'tertiary' | 'link' | 'neutral' | 'white' | 'black' | 'error' | 'warning' | 'success' | 'info' | 'transparent';

export const colorLuminance = (hexValue: string, luminance: number = 0): string => {
  // Validate hex string
  let hex: string = String(hexValue).replace(/[^0-9a-f]/gi, '');

  if(hex.length < 6) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  let rgb = '#';
  let color: string;
  let colorIdx: number;

  for(let index: number = 0; index < 3; index++) {
    colorIdx = parseInt(hex.substr(index * 2, 2), 16);
    color = Math.round(Math.min(Math.max(0, colorIdx + (colorIdx * luminance)), 255)).toString(16);
    rgb += (`00${color}`).substr(color.length);
  }

  return rgb;
};

export const gothamColors = [
  'primary',
  'secondary',
  'tertiary',
  'link',
  'neutral',
  'black',
  'white',
  'error',
  'warning',
  'success',
  'info'
] as const;

export interface StyleClassOptions {
  readonly hasError?: boolean;
  readonly hasFocus?: boolean;
  readonly hasHover?: boolean;
}

export const getTextClasses = (color: GothamColor, options: StyleClassOptions = {}) => {
  const {
    hasFocus = false,
    hasHover = false
  } = options;
  const classes: string[] = [];

  if (color === 'primary') {
    classes.push('text-primary dark:text-primary-dark');

    if(hasHover) {
      classes.push('hover:text-primary-700 dark:hover:text-primary-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:text-primary-700 dark:focus:text-primary-dark-300');
    }
  } else if (color === 'secondary') {
    classes.push('text-secondary dark:text-secondary-dark');

    if(hasHover) {
      classes.push('hover:text-secondary-700 dark:hover:text-secondary-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:text-secondary-700 dark:focus:text-secondary-dark-300');
    }
  } else if (color === 'tertiary') {
    classes.push('text-tertiary dark:text-tertiary-dark');

    if(hasHover) {
      classes.push('hover:text-tertiary-700 dark:hover:text-tertiary-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:text-tertiary-700 dark:focus:text-tertiary-dark-300');
    }
  } else if(color === 'link') {
    classes.push('text-link dark:text-link-dark');

    if(hasHover) {
      classes.push('hover:text-link-700 dark:hover:text-link-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:text-link-700 dark:focus:text-link-dark-300');
    }
  } else if (color === 'neutral') {
    classes.push('text-neutral dark:text-neutral-dark');

    if(hasHover) {
      classes.push('hover:text-neutral-700 dark:hover:text-neutral-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:text-neutral-700 dark:focus:text-neutral-dark-300');
    }
  } else if (color === 'white') {
    classes.push('text-white dark:text-white-dark');

    if(hasHover) {
      classes.push('hover:text-white-300 dark:hover:text-white-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:text-white-700 dark:focus:text-white-dark-700');
    }
  } else if (color === 'error') {
    classes.push('text-error dark:text-error-dark');

    if(hasHover) {
      classes.push('hover:text-error-700 dark:hover:text-error-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:text-error-700 dark:focus:text-error-dark-300');
    }
  } else if (color === 'warning') {
    classes.push('text-warning dark:text-warning-dark');

    if(hasHover) {
      classes.push('hover:text-warning-700 dark:hover:text-warning-dark-300');
    }
  } else if (color === 'success') {
    classes.push('text-success dark:text-success-dark');

    if(hasHover) {
      classes.push('hover:text-success-700 dark:hover:text-success-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:text-success-700 dark:focus:text-success-dark-300');
    }
  } else if (color === 'info') {
    classes.push('text-info dark:text-info-dark');

    if(hasHover) {
      classes.push('hover:text-info-700 dark:hover:text-info-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:text-info-700 dark:focus:text-info-dark-300');
    }
  } else {
    classes.push('text-black dark:text-white');

    if(hasHover) {
      classes.push('hover:text-black dark:hover:text-black-dark');
    }

    if(hasFocus) {
      classes.push('focus:text-black-900 dark:focus:text-black-dark-900');
    }
  }

  return classes.join(' ');
};


export const getPlaceholderClasses = (color: GothamColor, options: StyleClassOptions = {}) => {
  const {
    hasFocus = false,
    hasHover = false
  } = options;
  const classes: string[] = [];

  if (color === 'primary') {
    classes.push('placeholder:text-primary dark:placeholder:text-primary-dark');

    if(hasHover) {
      classes.push('hover:placeholder:text-primary-700 dark:hover:placeholder:text-primary-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:placeholder:text-primary-700 dark:focus:placeholder:text-primary-dark-300');
    }
  } else if (color === 'secondary') {
    classes.push('placeholder:text-secondary dark:placeholder:text-secondary-dark');

    if(hasHover) {
      classes.push('hover:placeholder:text-secondary-700 dark:hover:placeholder:text-secondary-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:placeholder:text-secondary-700 dark:focus:placeholder:text-secondary-dark-300');
    }
  } else if (color === 'tertiary') {
    classes.push('placeholder:text-tertiary dark:placeholder:text-tertiary-dark');

    if(hasHover) {
      classes.push('hover:placeholder:text-tertiary-700 dark:hover:placeholder:text-tertiary-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:placeholder:text-tertiary-700 dark:focus:placeholder:text-tertiary-dark-300');
    }
  } else if(color === 'link') {
    classes.push('placeholder:text-link dark:placeholder:text-link-dark');

    if(hasHover) {
      classes.push('hover:placeholder:text-link-700 dark:hover:placeholder:text-link-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:placeholder:text-link-700 dark:focus:placeholder:text-link-dark-300');
    }
  } else if (color === 'neutral') {
    classes.push('placeholder:text-neutral dark:placeholder:text-neutral-dark');

    if(hasHover) {
      classes.push('hover:placeholder:text-neutral-700 dark:hover:placeholder:text-neutral-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:placeholder:text-neutral-700 dark:focus:placeholder:text-neutral-dark-300');
    }
  } else if (color === 'white') {
    classes.push('placeholder:text-white dark:placeholder:text-black');

    if(hasHover) {
      classes.push('hover:placeholder:text-white-700 dark:hover:placeholder:text-black-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:placeholder:text-white-700 dark:focus:placeholder:text-black-dark-300');
    }
  } else if (color === 'error') {
    classes.push('placeholder:text-error dark:placeholder:text-error-dark');

    if(hasHover) {
      classes.push('hover:placeholder:text-error-700 dark:hover:placeholder:text-error-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:placeholder:text-error-700 dark:focus:placeholder:text-error-dark-300');
    }
  } else if (color === 'warning') {
    classes.push('placeholder:text-warning dark:placeholder:text-warning-dark');

    if(hasHover) {
      classes.push('hover:placeholder:text-warning-700 dark:hover:placeholder:text-warning-dark-300');
    }
  } else if (color === 'success') {
    classes.push('placeholder:text-success dark:placeholder:text-success-dark');

    if(hasHover) {
      classes.push('hover:placeholder:text-success-700 dark:hover:placeholder:text-success-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:placeholder:text-success-700 dark:focus:placeholder:text-success-dark-300');
    }
  } else if (color === 'info') {
    classes.push('placeholder:text-info dark:placeholder:text-info-dark');

    if(hasHover) {
      classes.push('hover:placeholder:text-info-700 dark:hover:placeholder:text-info-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:placeholder:text-info-700 dark:focus:placeholder:text-info-dark-300');
    }
  } else {
    classes.push('placeholder:text-black dark:placeholder:text-white');

    if(hasHover) {
      classes.push('hover:placeholder:text-black dark:hover:placeholder:text-white');
    }

    if(hasFocus) {
      classes.push('focus:placeholder:text-black dark:focus:placeholder:text-white');
    }
  }

  return classes.join(' ');
};

export const getErrorClasses = (errorColor: GothamColor) => {
  if (errorColor === 'error') {
    return 'text-error dark:text-error-dark';
  } else if (errorColor === 'warning') {
    return 'text-warning dark:text-warning-dark';
  } else if (errorColor === 'success') {
    return 'text-success dark:text-success-dark';
  } else {
    return 'text-info dark:text-info-dark';
  }
};

export const getBorderClasses = (color: GothamColor, options: StyleClassOptions = {}) => {
  const {
    hasFocus = false,
    hasHover = false
  } = options;
  const classes: string[] = [];

  if (color === 'primary') {
    classes.push('border-primary dark:border-primary-dark');

    if(hasHover) {
      classes.push('hover:border-primary-700 dark:hover:border-primary-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:border-primary-700 dark:focus:border-primary-dark-300');
    }
  } else if (color === 'secondary') {
    classes.push('border-secondary dark:border-secondary-dark');

    if(hasHover) {
      classes.push('hover:border-secondary-700 dark:hover:border-secondary-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:border-secondary-700 dark:focus:border-secondary-dark-300');
    }
  } else if (color === 'tertiary') {
    classes.push('border-tertiary dark:border-tertiary-dark');

    if(hasHover) {
      classes.push('hover:border-tertiary-700 dark:hover:border-tertiary-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:border-tertiary-700 dark:focus:border-tertiary-dark-300');
    }
  } else if (color === 'error') {
    classes.push('border-error dark:border-error-dark');

    if(hasHover) {
      classes.push('hover:border-error-700 dark:hover:border-error-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:border-error-700 dark:focus:border-error-dark-300');
    }
  } else if (color === 'warning') {
    classes.push('border-warning dark:border-warning-dark');

    if(hasHover) {
      classes.push('hover:border-warning-700 dark:hover:border-warning-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:border-warning-700 dark:focus:border-warning-dark-300');
    }
  } else if (color === 'success') {
    classes.push('border-success dark:border-success-dark');

    if(hasHover) {
      classes.push('hover:border-success-700 dark:hover:border-success-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:border-success-700 dark:focus:border-success-dark-300');
    }
  } else if (color === 'info') {
    classes.push('border-info dark:border-info-dark');

    if(hasHover) {
      classes.push('hover:border-info-700 dark:hover:border-info-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:border-info-700 dark:focus:border-info-dark-300');
    }
  } else {
    classes.push('border-black dark:border-white');

    if(hasHover) {
      classes.push('hover:border-black dark:hover:border-white');
    }

    if(hasFocus) {
      classes.push('focus:border-black dark:focus:border-white');
    }
  }

  return classes.join(' ');
};


export const getOutlineClasses = (color: GothamColor, options: StyleClassOptions = {}) => {
  const {
    hasFocus = false,
    hasHover = false
  } = options;
  const classes: string[] = [];

  if (color === 'primary') {
    classes.push('outline-primary dark:outline-primary-dark');

    if(hasHover) {
      classes.push('hover:outline-primary-700 dark:hover:outline-primary-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:outline-primary-700 dark:focus:outline-primary-dark-300');
    }
  } else if (color === 'secondary') {
    classes.push('outline-secondary dark:outline-secondary-dark');

    if(hasHover) {
      classes.push('hover:outline-secondary-700 dark:hover:outline-secondary-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:outline-secondary-700 dark:focus:outline-secondary-dark-300');
    }
  } else if (color === 'tertiary') {
    classes.push('outline-tertiary dark:outline-tertiary-dark');

    if(hasHover) {
      classes.push('hover:outline-tertiary-700 dark:hover:outline-tertiary-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:outline-tertiary-700 dark:focus:outline-tertiary-dark-300');
    }
  } else if (color === 'error') {
    classes.push('outline-error dark:outline-error-dark');

    if(hasHover) {
      classes.push('hover:outline-error-700 dark:hover:outline-error-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:outline-error-700 dark:focus:outline-error-dark-300');
    }
  } else if (color === 'warning') {
    classes.push('outline-warning dark:outline-warning-dark');

    if(hasHover) {
      classes.push('hover:outline-warning-700 dark:hover:outline-warning-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:outline-warning-700 dark:focus:outline-warning-dark-300');
    }
  } else if (color === 'success') {
    classes.push('outline-success dark:outline-success-dark');

    if(hasHover) {
      classes.push('hover:outline-success-700 dark:hover:outline-success-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:outline-success-700 dark:focus:outline-success-dark-300');
    }
  } else if (color === 'info') {
    classes.push('outline-info dark:outline-info-dark');

    if(hasHover) {
      classes.push('hover:outline-info-700 dark:hover:outline-info-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:outline-info-700 dark:focus:outline-info-dark-300');
    }
  } else {
    classes.push('outline-black dark:outline-white');

    if(hasHover) {
      classes.push('hover:outline-black dark:hover:outline-white');
    }

    if(hasFocus) {
      classes.push('focus:outline-black dark:focus:outline-white');
    }
  }

  return classes.join(' ');
};

export const getCheckedClasses = (color: GothamColor) => {
  const classes: string[] = [];

  if (color === 'primary') {
    classes.push('checked:border-primary-700 dark:checked:border-primary-dark-300 checked:bg-primary-700 dark:checked:bg-primary-dark-300');
  } else if (color === 'secondary') {
    classes.push('checked:border-secondary-700 dark:checked:border-secondary-dark-300 checked:bg-secondary-700 dark:checked:bg-secondary-dark-300');
  } else if (color === 'tertiary') {
    classes.push('checked:border-tertiary-700 dark:checked:border-tertiary-dark-300 checked:bg-tertiary-700 dark:checked:bg-tertiary-dark-300');
  } else if (color === 'neutral') {
    classes.push('checked:border-neutral-700 dark:checked:border-neutral-dark-300 checked:bg-neutral-700 dark:checked:bg-neutral-dark-300');
  } else if (color === 'error') {
    classes.push('checked:border-error-700 dark:checked:border-error-dark-300 checked:bg-error-700 dark:checked:bg-error-dark-300');
  } else if (color === 'warning') {
    classes.push('checked:border-warning-700 dark:checked:border-warning-dark-300 checked:bg-warning-700 dark:checked:bg-warning-dark-300');
  } else if (color === 'success') {
    classes.push('checked:border-success-700 dark:checked:border-success-dark-300 checked:bg-success-700 dark:checked:bg-success-dark-300');
  } else if (color === 'white') {
    classes.push('checked:border-white-700 dark:checked:border-black-dark-300 checked:bg-white-700 dark:checked:bg-black-dark-300');
  } else if (color === 'black') {
    classes.push('checked:border-black-700 dark:checked:border-white-dark-300 checked:bg-black-700 dark:checked:bg-white-dark-300');
  }

  return classes.join(' ');
};

export const getBackgroundClasses = (color: GothamColor, options: StyleClassOptions = {}) => {
  const {
    hasFocus = false,
    hasHover = false
  } = options;
  const classes: string[] = [];

  if (color === 'primary') {
    classes.push('bg-primary dark:bg-primary-dark');

    if(hasHover) {
      classes.push('hover:bg-primary-700 dark:hover:bg-primary-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:bg-primary-700 dark:focus:bg-primary-dark-300');
    }
  } else if (color === 'secondary') {
    classes.push('bg-secondary dark:bg-secondary-dark');

    if(hasHover) {
      classes.push('hover:bg-secondary-700 dark:hover:bg-secondary-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:bg-secondary-700 dark:focus:bg-secondary-dark-300');
    }
  } else if (color === 'tertiary') {
    classes.push('bg-tertiary dark:bg-tertiary-dark');

    if(hasHover) {
      classes.push('hover:bg-tertiary-700 dark:hover:bg-tertiary-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:bg-tertiary-700 dark:focus:bg-tertiary-dark-300');
    }
  } else if (color === 'neutral') {
    classes.push('bg-neutral dark:bg-neutral-dark');

    if(hasHover) {
      classes.push('hover:bg-neutral-700 dark:hover:bg-neutral-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:bg-neutral-700 dark:focus:bg-neutral-dark-300');
    }
  } else if (color === 'white') {
    classes.push('bg-white dark:bg-black');

    if(hasHover) {
      classes.push('hover:bg-white-700 dark:hover:bg-black-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:bg-white-700 dark:focus:bg-black-dark-300');
    }
  } else if (color === 'black') {
    classes.push('bg-black dark:bg-white');

    if(hasHover) {
      classes.push('hover:bg-black-700 dark:hover:bg-white-dark-300');
    }

    if(hasFocus) {
      classes.push('focus:bg-black-700 dark:focus:bg-white-dark-300');
    }
  } else if (color === 'transparent') {
    classes.push('bg-transparent');
  }

  return classes.join(' ');
};

export const getBackgroundViewClasses = (color: GothamColor, options: StyleClassOptions = {}) => {
  const {
    hasFocus = false,
    hasHover = false
  } = options;
  const classes: string[] = [];

  if (color === 'primary') {
    classes.push('bg-background-primary dark:bg-background-primary-dark');

    if(hasHover) {
      classes.push('hover:bg-background-primary-700 dark:hover:bg-background-primary-300');
    }

    if(hasFocus) {
      classes.push('focus:bg-background-primary-700 dark:focus:bg-background-primary-300');
    }
  } else if (color === 'secondary') {
    classes.push('bg-background-secondary dark:bg-background-secondary-dark');

    if(hasHover) {
      classes.push('hover:bg-background-secondary-700 dark:hover:bg-background-secondary-300');
    }

    if(hasFocus) {
      classes.push('focus:bg-background-secondary-700 dark:focus:bg-background-secondary-300');
    }
  } else if (color === 'tertiary') {
    classes.push('bg-background-tertiary dark:bg-background-tertiary-dark');

    if(hasHover) {
      classes.push('hover:bg-background-tertiary-700 dark:hover:bg-background-tertiary-300');
    }

    if(hasFocus) {
      classes.push('focus:bg-background-tertiary-700 dark:focus:bg-background-tertiary-300');
    }
  } else if (color === 'neutral') {
    classes.push('bg-background-neutral dark:bg-background-neutral-dark');

    if(hasHover) {
      classes.push('hover:bg-background-neutral-700 dark:hover:bg-background-neutral-300');
    }

    if(hasFocus) {
      classes.push('focus:bg-background-neutral-700 dark:focus:bg-background-neutral-300');
    }
  } else if (color === 'white') {
    classes.push('bg-white dark:bg-black');

    if(hasHover) {
      classes.push('hover:bg-white-700 dark:hover:bg-black-300');
    }

    if(hasFocus) {
      classes.push('focus:bg-white-700 dark:focus:bg-black-300');
    }
  } else if (color === 'black') {
    classes.push('bg-black dark:bg-white');

    if(hasHover) {
      classes.push('hover:bg-black-700 dark:hover:bg-white-300');
    }

    if(hasFocus) {
      classes.push('focus:bg-black-700 dark:focus:bg-white-300');
    }
  }

  return classes.join(' ');
};