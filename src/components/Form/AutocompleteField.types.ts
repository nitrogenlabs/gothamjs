export interface AutocompleteFieldProps {
  readonly classes?: any;
  readonly getList?: (value: string) => any[];
  readonly name: string;
  readonly suggestions: any[];
  readonly validate?: (object) => object | Promise<object>;
  readonly value: string;
  readonly valueKey?: string;
  readonly wait?: number;
}

export interface AutocompleteFieldState {
  readonly single: string;
  readonly suggestions: any[];
  readonly value: string;
}
