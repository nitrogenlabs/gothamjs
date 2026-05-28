import {createContext, useContext} from 'react';

export type FormErrors = Record<string, {readonly message?: string; readonly type?: string} | string | undefined>;
export type FormValues = Record<string, unknown>;

export interface GothamFormContextValue {
  readonly clearError: (name: string) => void;
  readonly defaultValues: FormValues;
  readonly errors: FormErrors;
  readonly isSubmitting: boolean;
  readonly setValue: (name: string, value: unknown) => void;
  readonly values: FormValues;
}

export const GothamFormContext = createContext<GothamFormContextValue | null>(null);

export const useGothamFormContext = (): GothamFormContextValue | null => useContext(GothamFormContext);

export const getFormErrorMessage = (error: FormErrors[string]): string | undefined => {
  if(typeof error === 'string') {
    return error;
  }

  return error?.message;
};
