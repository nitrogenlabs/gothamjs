import {SyntheticEvent} from 'react';

export type AutocompleteSuggestionMethod = 'click' | 'enter';

export interface AutocompleteSuggestion {
  readonly suggestion: any;
  readonly suggestionValue: any;
  readonly suggestionIndex: number;
  readonly sectionIndex: number;
  readonly method: AutocompleteSuggestionMethod;
}

export interface AutocompleteFieldProps {
  readonly getList?: (value: string) => any[];
  readonly name: string;
  readonly onChange?: (event: SyntheticEvent) => any;
  readonly onFocus?: (event: SyntheticEvent) => any;
  readonly onSelected?: (suggestion: AutocompleteSuggestion) => any;
  readonly suggestionList: any[];
  readonly validate?: (object) => object | Promise<object>;
  readonly value: string;
  readonly valueKey?: string;
  readonly wait?: number;
}
