export type AutocompleteSuggestionMethod = 'click' | 'enter';

export interface AutocompleteSuggestion {
  readonly suggestion: any;
  readonly suggestionValue: any;
  readonly suggestionIndex: number;
  readonly sectionIndex: number;
  readonly method: AutocompleteSuggestionMethod;
}

export interface AutocompleteFieldProps {
  readonly classes?: any;
  readonly getList?: (value: string) => any[];
  readonly name: string;
  readonly onSelected?: (suggestion: AutocompleteSuggestion) => any;
  readonly suggestions: any[];
  readonly validate?: (object) => object | Promise<object>;
  readonly value: string;
  readonly valueKey?: string;
  readonly wait?: number;
}

export interface AutocompleteFieldState {
  readonly single: string;
  readonly suggestion: any;
  readonly suggestions: any[];
  readonly value: string;
}
