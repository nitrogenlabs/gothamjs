import type {Ref} from 'react';

export const assignRef = <T>(ref: Ref<T> | undefined, value: T | null): void => {
  if(typeof ref === 'function') {
    ref(value);
    return;
  }

  if(ref) {
    ref.current = value;
  }
};
